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
    it('should extract all user profiles from their html documents', () => {
      for (const mockDataEntry of userProfileMockData) {
        const actual = usersService.extractUserProfile(
          mockDataEntry.id,
          mockDataEntry.html,
        );
        expect(actual).toStrictEqual(mockDataEntry.expected);
      }
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
});
