import { Injectable } from '@nestjs/common';
import XmlJsService, { Element } from 'src/xml-api/xml-js.service';
import UserResource from '../resources/user.resource';

@Injectable()
export default class UsersService {
  constructor(private readonly xmljs: XmlJsService) {}

  /**
   * Transforms a user.
   * @param userElement The user xml element.
   * @returns The user.
   */
  transformUser(userElement: Element): UserResource {
    const user: UserResource = {
      id: this.xmljs.getAttribute('id', userElement) as string,
      groupId: this.xmljs.getAttribute('group-id', userElement) as string,
      name: this.xmljs.getElement('cdata', userElement)?.cdata,
    };
    return user;
  }
}
