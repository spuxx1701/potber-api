import { Test } from '@nestjs/testing';
import { XmlJsService } from 'src/xml-api/xml-js.service';
import { UserResource } from '../resources/user.resource';
import { UsersService } from './users.service';
import {
  userProfileMockData,
  userXmlMockData,
} from './users.service.spec.includes';
import { EncodingModule } from 'src/encoding/encoding.module';
import { HttpModule } from 'src/http/http.module';
import { NotFoundException } from '@nestjs/common';

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

  describe('extractUserProfile', () => {
    it('should extract the user profile from the html string', () => {
      const expected: UserResource = {
        id: '1268185',
        name: 'Ameisenfutter',
        rank: 'Spamkaiser',
        avatarUrl:
          'https://forum.mods.de/bb/avatare/upload/U1268185--small.png',
        lastLogin: '16.05.2023 11:57',
        activity: 'online',
        status: 'aktiv',
      };
      const actual = usersService.extractUserProfile(
        userProfileMockData.online.id,
        userProfileMockData.online.html,
      );
      expect(actual).toStrictEqual(expected);
    });

    it('should throw NotFoundException if the user could not be found', () => {
      const id = '1179058';
      const input = 'Benutzer 1179058 1179058 nicht gefunden!';
      expect(() => {
        usersService.extractUserProfile(id, input);
      }).toThrowError(NotFoundException);
    });
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
