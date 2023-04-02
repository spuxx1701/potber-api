import { Test } from '@nestjs/testing';
import { XmlJsService } from 'src/xml-api/xml-js.service';
import { UserResource } from '../resources/user.resource';
import { UsersService } from './users.service';
import { userXmlMockData } from './users.service.spec.includes';
import { EncodingModule } from 'src/encoding/encoding.module';
import { HttpModule } from 'src/http/http.module';

describe('Users | UsersService', () => {
  let usersService: UsersService;
  let xmljs: XmlJsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EncodingModule, HttpModule],
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
        name: 'Real_Futti',
        groupId: '3',
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('parseAvatarUrl', () => {
    it('should properly parse an old avatar URL', () => {
      const input = 'avatare/oldb/shooter.gif';
      const expected = 'https://forum.mods.de/bb/avatare/oldb/shooter.gif';
      expect(usersService.parseAvatarUrl(input)).toBe(expected);
    });

    it('should properly parse a new avatar URL', () => {
      const input = './avatare/upload/U3035--e-razor.png';
      const expected =
        'https://forum.mods.de/bb/avatare/upload/U3035--e-razor.png';
      expect(usersService.parseAvatarUrl(input)).toBe(expected);
    });
  });
});
