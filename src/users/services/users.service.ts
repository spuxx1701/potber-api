import { Injectable } from '@nestjs/common';
import XmlTransformerService from 'src/xml-api/xml-transformer.service';
import UserResource from '../resources/user.resource';

@Injectable()
export default class UsersService {
  constructor(private readonly xts: XmlTransformerService) {}

  /**
   * Transforms a user.
   * @param userXml The user xml.
   * @returns The user.
   */
  transformUser(userXml: Element): UserResource {
    const user = {
      id: this.xts.getAttributeValue('id', userXml),
      groupId: this.xts.getAttributeValue('group-id', userXml),
      name: userXml.textContent || this.xts.getNodeTextContent('name', userXml),
    } as UserResource;
    return user;
  }
}
