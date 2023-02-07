import { Test } from '@nestjs/testing';
import XmlTransformerService from 'src/xml-api/xml-transformer.service';
import UserResource from '../resources/user.resource';
import UsersService from './users.service';
import { userXmlMockData } from './users.service.spec.includes';

describe('Users | UsersService', () => {
  let usersService: UsersService;
  let xts: XmlTransformerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [XmlTransformerService, UsersService],
    }).compile();
    usersService = await moduleRef.resolve(UsersService);
    xts = await moduleRef.resolve(XmlTransformerService);
  });

  describe('transformUser', () => {
    it('Should transform the user without a group.', () => {
      const actual = usersService.transformUser(
        xts.parseXml(userXmlMockData.withoutGroup).documentElement,
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
        xts.parseXml(userXmlMockData.withGroup).documentElement,
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
