import { Test } from '@nestjs/testing';
import XmlJsService from 'src/xml-api/xml-js.service';
import UserResource from '../resources/user.resource';
import UsersService from './users.service';
import { userXmlMockData } from './users.service.spec.includes';

describe('Users | UsersService', () => {
  let usersService: UsersService;
  let xmljs: XmlJsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [XmlJsService, UsersService],
    }).compile();
    usersService = await moduleRef.resolve(UsersService);
    xmljs = await moduleRef.resolve(XmlJsService);
  });

  describe('transformUser', () => {
    it('Should transform the user without a group.', () => {
      const actual = usersService.transformUser(
        xmljs.parseXml(userXmlMockData.withoutGroup).elements[0],
      );
      const expected: UserResource = {
        id: '1100939',
        name: 'Icefeldt',
        groupId: undefined,
      };
      expect(actual).toEqual(expected);
    });

    it('Should transform the user with a group.', () => {
      const actual = usersService.transformUser(
        xmljs.parseXml(userXmlMockData.withGroup).elements[0],
      );
      const expected: UserResource = {
        id: '1341645',
        name: 'Real_Futtid',
        groupId: '3',
      };
      expect(actual).toEqual(expected);
    });
  });
});
