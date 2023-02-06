import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { forumConfig } from 'src/config/forum.config';
import { authExceptions } from './auth.exceptions';
import LoginResource from './resources/login.resource';
import SessionResource from './resources/session.resource';
import { JwtService } from '@nestjs/jwt';
import JwtResource from './resources/jwt.resource';

@Injectable()
export default class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private jwtService: JwtService,
  ) {}

  async login(loginResource: LoginResource): Promise<JwtResource> {
    Logger.log(
      `User '${loginResource.username}' is attempting to log in.`,
      this.constructor.name,
    );
    try {
      const payload = `login_username=${encodeURIComponent(
        loginResource.username,
      )}&login_password=${encodeURIComponent(
        loginResource.password,
      )}&login_lifetime=${loginResource.lifetime}`;
      const { data } = await firstValueFrom(
        this.httpService.post(forumConfig.LOGIN_URL, payload).pipe(
          catchError((error: AxiosError) => {
            throw new Error(`Unable to log into forum: ${error.response.data}`);
          }),
        ),
      );
      this.checkForLoginSuccess(data);
      const cookieUrl = this.getSessionCookieUrl(data);
      const cookie = await this.getSessionCookie(cookieUrl);
      const session = await this.getSessionDetails(cookie);
      Logger.log(
        `User '${session.username}' has signed in.`,
        this.constructor.name,
      );
      return {
        access_token: this.jwtService.sign(session, {
          expiresIn: loginResource.lifetime,
        }),
      } as JwtResource;
    } catch (error) {
      Logger.log('Login attempt failed.', this.constructor.name);
      throw error;
    }
  }

  /**
   * Checks the login response for signs of success. Throws an exception if
   * login was not successful.
   */
  checkForLoginSuccess(data: string) {
    if (/Erfolgreich eingeloggt/.test(data)) {
      return true;
    } else if (/Fehler\sbeim\sEinloggen/.test(data)) {
      throw authExceptions.wrongCredentials;
    } else {
      throw authExceptions.unknownLoginFailure;
    }
  }

  /**
   * Searches the text response for the session cookie location.
   * @param data The text data to search.
   * @returns Returns the URL of the post-login page from where the
   * session cookie need to be retrieved.
   */
  getSessionCookieUrl(data: string): string {
    const iframeUriMatches = data.match(/(?:(<iframe\ssrc=')(.*?)?('))/);
    if (iframeUriMatches && iframeUriMatches.length >= 3) {
      return `https:${iframeUriMatches[2]}`;
    } else {
      throw new Error('Unable to retrieve session cookie location.');
    }
  }

  /**
   * Gets the two session cookie from the given URL.
   * @param url The url that should be called to retrieve the cookie.
   * @returns The object containing the session cookie.
   */
  async getSessionCookie(url: string) {
    const { headers } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          throw new Error(
            `Unable to retrieve session details: ${error.response.data}`,
          );
        }),
      ),
    );
    const cookie = headers['set-cookie'];
    if (cookie && cookie.length >= 2) {
      // Since the first cookie tends to not work, we use the second one
      return `${cookie[1].split(';')[0]}`;
    } else {
      throw new Error('Did not find receive two session cookie.');
    }
  }

  /**
   * Calls the forum landing page with the given session cookie and retrieves
   * details about the current session.
   * @param cookie The session cookie.
   * @returns The session details.
   */
  async getSessionDetails(cookie: string): Promise<SessionResource> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(forumConfig.FORUM_URL, {
          headers: {
            Cookie: cookie,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new Error(
              `Unable to retrieve session details: ${error.response.data}`,
            );
          }),
        ),
    );
    const session = this.extractSessionDetails(data, cookie);
    return session;
  }

  /**
   * Searches the given HTML and attempts to extract session details from
   * the HTML (namely the user ID, the username and the logout token).
   * Will throw an error if retrieving any of these details fails.
   * @param data The HTML text.
   * @param cookie The cookie. Will be stored in the session details.
   * @returns The session details.
   */
  private extractSessionDetails(data: string, cookie: string): SessionResource {
    if (/Du\sbist\snicht\seingeloggt/.test(data)) {
      throw new Error('Unable to confirm login.');
    }
    // Extract user ID, username and logout token
    const userIdMatches = data.match(/(?:(User-ID\s)(.*)(\.\n))/);
    const usernameMatches = data.match(/(?:(my\.mods\.de\/)(.*)("\s))/);
    const logoutTokenMatches = data.match(
      /(?:(\/logout\/.*&a=)(.*)(&redirect))/,
    );
    if (
      !userIdMatches ||
      userIdMatches.length < 3 ||
      !usernameMatches ||
      usernameMatches.length < 3 ||
      !logoutTokenMatches ||
      logoutTokenMatches.length < 3
    ) {
      throw new Error('Unable to session details.');
    }
    const session: SessionResource = {
      userId: userIdMatches[2],
      username: usernameMatches[2],
      logoutToken: logoutTokenMatches[2],
      boardSessionCookie: cookie,
    };
    return session;
  }
}
