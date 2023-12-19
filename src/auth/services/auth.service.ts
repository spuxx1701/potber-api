import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { forumConfig } from 'src/config/forum.config';
import { authExceptions } from '../config/auth.exceptions';
import { LoginResource } from '../resources/login.resource';
import { SessionResource } from '../resources/session.resource';
import { JwtService } from '@nestjs/jwt';
import { JwtResource } from '../resources/jwt.resource';
import { HttpService } from 'src/http/http.service';
import { XmlJsService } from 'src/xml-api/xml-js.service';
import { EncodingService } from 'src/encoding/encoding.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly xmljs: XmlJsService,
    private readonly jwtService: JwtService,
    private readonly encodingService: EncodingService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginResource: LoginResource): Promise<JwtResource> {
    Logger.log(
      `User '${loginResource.username}' is attempting to log in.`,
      this.constructor.name,
    );
    const lifetime =
      typeof loginResource.lifetime === 'number'
        ? loginResource.lifetime
        : parseInt(loginResource.lifetime);
    try {
      const username = this.encodingService.encodeLoginCredentials(
        loginResource.username,
      );
      const password = this.encodingService.encodeLoginCredentials(
        loginResource.password,
      );
      const payload = `login_username=${username}&login_password=${password}&login_lifetime=${lifetime}`;
      const { data } = await this.httpService.post(
        forumConfig.LOGIN_URL,
        payload,
      );
      this.checkForLoginSuccess(data);
      const cookieUrl = this.getSessionCookieUrl(data);
      const cookie = await this.getSessionCookie(cookieUrl);
      const session = await this.createSession(cookie);
      Logger.log(
        `User '${session.username}' has signed in.`,
        this.constructor.name,
      );
      return {
        access_token: this.jwtService.sign(session, {
          expiresIn: lifetime,
        }),
      } as JwtResource;
    } catch (error) {
      Logger.log(`Login attempt failed (${error}).`, this.constructor.name);
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
      throw authExceptions.login.wrongCredentials;
    } else {
      throw authExceptions.login.unknown;
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
    const { headers } = await this.httpService.get(url);
    const cookie = headers['set-cookie'];
    if (cookie && cookie.length >= 2) {
      // Since the first cookie tends to not work, we use the second one
      return `${cookie[1].split(';')[0]}`;
    } else {
      throw new Error('Did not receive two session cookies.');
    }
  }

  /**
   * Calls the forum landing page with the given session cookie and creates a new session
   * using the retrieved details.
   * @param cookie The session cookie.
   * @returns The session.
   */
  async createSession(cookie: string): Promise<SessionResource> {
    try {
      const userId = await this.getUserId(cookie);
      const { name, avatarUrl } = await this.usersService.findById(userId);
      const session: Partial<SessionResource> = {
        userId,
        username: name,
        avatarUrl,
        cookie,
      };
      return session as SessionResource;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  /**
   * Calls the 'boards.php' endpoint to extract the user id.
   * @param cookie The session cookie.
   */
  async getUserId(cookie: string): Promise<string> {
    const { data } = await this.httpService.get(
      `${forumConfig.API_URL}boards.php`,
      {
        cookie,
      },
    );
    const xmlDocument = this.xmljs.parseXml(data);
    const userId = this.xmljs.getAttribute(
      'current-user-id',
      xmlDocument.elements[0],
    );
    if (!userId) {
      throw new Error('Unable to retrieve user id.');
    }
    return userId;
  }
}
