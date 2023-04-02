import { Injectable } from '@nestjs/common';
import { forumConfig } from 'src/config/forum.config';
import { HttpService } from 'src/http/http.service';
import { Element, XmlJsService } from 'src/xml-api/xml-js.service';
import { usersExceptions } from '../config/users.exceptions';
import { UserResource } from '../resources/user.resource';
import { EncodingService } from 'src/encoding/encoding.service';
/**
 * The users service class. Can transform users.
 */
@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly xmljs: XmlJsService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Returns a user by it's id.
   * @param id The user's id.
   * @returns The user resource.
   */
  async findById(id: string): Promise<UserResource> {
    if (!id) throw usersExceptions.findById.invalidId;
    const { data } = await this.httpService.get(
      `${forumConfig.USER_PAGE_URL}${id}`,
    );
    return this.extractUserProfile(id, data);
  }

  extractUserProfile(id: string, html: string): UserResource {
    const nameMatches = html.match(/(?:(Profil\:\s)(.*)(<\/title>))/);
    const name = this.encodingService.decodeText(nameMatches[2]) as string;
    const lastLoginMatches = html.match(
      /(?:(Zuletzt im Board:<\/td>\n.*>)(.*)(<\/td>))/,
    );
    const lastLogin = lastLoginMatches[2];
    const activityMatches = html.match(/(?:(Status:<\/td>\n.*>)(.*)(<\/td>))/);
    const onlineMatches = html.match(/(?:(<span class="online">)(.*)<\/span>)/);
    const activity = activityMatches[2]?.trim() || onlineMatches[2]?.trim();
    const statusMatches = html.match(
      /(?:(Accountstatus:<\/td>\n.*>)(.*)(<\/td>))/,
    );
    const status = statusMatches[2];
    const avatarUrlMatches = html.match(
      /(?:(<img\ssrc="\/\/forum.mods.de\/bb\/)(.*)("\sclass="avatar"))/,
    );
    const avatarUrl = this.parseAvatarUrl(avatarUrlMatches[2]);
    const user: UserResource = {
      id,
      name,
      lastLogin,
      activity,
      status,
      avatarUrl,
    };
    return user;
  }

  /**
   * Transforms a user.
   * @param userElement The user xml element.
   * @returns The user.
   */
  transformUser(userElement: Element): UserResource {
    const user: UserResource = {
      id: this.xmljs.getAttribute('id', userElement),
      groupId: this.xmljs.getAttribute('group-id', userElement),
      name: this.xmljs.getElement('cdata', userElement)?.cdata,
    };
    return user;
  }

  /**
   * The board outputs avatar URLs as relative paths. On top of that,
   * older avatars were stored differently than more recent avatars. This function
   * parses those relative URLs to absolute URLs.
   * @param rawUrl The raw URL.
   * @returns The parsed absolute URL.
   */
  parseAvatarUrl(rawUrl: string): string {
    // Remove './' from avatarUrl
    const path = rawUrl.replace(/^\.\//, '');
    return `${forumConfig.FORUM_URL}${path}`;
  }
}
