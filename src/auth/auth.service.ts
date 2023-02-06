import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { forumConfig } from 'src/config/forum.config';
import { httpConfig } from 'src/config/http.config';
import { authExceptions } from './auth.exceptions';
import LoginResource from './resources/login.resource';
import SessionResource from './resources/session.resource';

@Injectable()
export default class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login(loginResource: LoginResource): Promise<SessionResource> {
    Logger.log(
      `User '${loginResource.username}' is attempting to log in.`,
      this.constructor.name,
    );
    const payload = `login_username=${encodeURIComponent(
      loginResource.username,
    )}&login_password=${encodeURIComponent(
      loginResource.password,
    )}&login_lifetime=${loginResource.lifetime}`;
    const { data } = await firstValueFrom(
      this.httpService.post(forumConfig.LOGIN_URL, payload).pipe(
        catchError((error: AxiosError) => {
          throw new Error(`Unable to log into forum: ${error.response.data}`);
          debugger;
        }),
      ),
    );
    this.checkForLoginSuccess(data);
    const cookiesUrl = this.getSessionCookiesUrl(data);
    const cookies = await this.getSessionCookies(cookiesUrl);
    const session = await this.getSessionDetails(cookies);
    return session;
  }

  /**
   * Checks the login response for signs of success. Throws an exception if
   * login was not successful.
   */
  private checkForLoginSuccess(data: string) {
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
  private getSessionCookiesUrl(data: string): string {
    const iframeUriMatches = data.match(/(?:(<iframe\ssrc=')(.*?)?('))/);
    if (iframeUriMatches && iframeUriMatches.length >= 3) {
      return `https:${iframeUriMatches[2]}`;
    } else {
      throw new Error('Unable to retrieve session cookie location.');
    }
  }

  /**
   * Gets the two session cookies from the given URL.
   * @param url The url that should be called to retrieve the cookies.
   * @returns The object containing the session cookies.
   */
  private async getSessionCookies(url: string) {
    const { headers } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          throw new Error(
            `Unable to retrieve session details: ${error.response.data}`,
          );
        }),
      ),
    );
    const cookies = headers['set-cookie'];
    if (cookies && cookies.length >= 2) {
      return `${cookies[0]}; ${cookies[1]}`;
    } else {
      throw new Error('Did not find receive two session cookies.');
    }
  }

  /**
   * Calls the forum landing page with the given session cookies and retrieves
   * details about the current session.
   * @param cookies The session cookies.
   * @returns The session details.
   */
  async getSessionDetails(cookies: string): Promise<SessionResource> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(forumConfig.FORUM_URL, {
          headers: {
            Cookie: cookies,
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
    debugger;
    const session = this.extractSessionDetails(data);
    return session;
  }

  private extractSessionDetails(data: string): SessionResource {
    if (/Du\sbist\snicht\seingeloggt/.test(data)) {
      throw new Error('Unable to confirm login.');
    }
    debugger;
    const session: SessionResource = {
      userId: '123',
      username: 'yolo',
      logoutToken: 'adawd',
    };
    return session;
  }
}
