import { Injectable } from '@nestjs/common';
import { Element, XmlJsService } from 'src/xml-api/xml-js.service';
import { UserResource } from '../resources/user.resource';

@Injectable()
export class UsersService {
  constructor(private readonly xmljs: XmlJsService) {}

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
}
