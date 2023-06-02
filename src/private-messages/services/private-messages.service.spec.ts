import { PrivateMessagesService } from './private-messages.service';
import { EncodingModule } from 'src/encoding/encoding.module';
import {
  TestContainer,
  createTestContainer,
} from 'test/helpers/create-test-container';
import { privateMessagesMockData } from 'test/mock-data/private-messages.mock-data';
import { PrivateMessageFolder } from '../types';
import { privateMessagesExceptions } from '../config/private-messages.exceptions';

describe('Private Messages | PrivateMessagesService', () => {
  let container: TestContainer;
  let service: PrivateMessagesService;

  beforeEach(async () => {
    container = await createTestContainer({
      imports: [EncodingModule],
      providers: [PrivateMessagesService],
      mockHttp: true,
      mockSession: true,
    });
    service = await container.module.resolve<PrivateMessagesService>(
      PrivateMessagesService,
    );
  });

  describe('findMany', () => {
    it('should return all inbound messages', async () => {
      container.httpService.mockGet(privateMessagesMockData.inbound);
      expect(
        await service.findMany(container.session, {
          folder: PrivateMessageFolder.inbound,
        }),
      ).toHaveLength(3);
      jest.clearAllMocks();
    });

    it('should only return unread inbound messages', async () => {
      container.httpService.mockGet(privateMessagesMockData.inbound);
      expect(
        await service.findMany(container.session, {
          folder: PrivateMessageFolder.inbound,
          unread: true,
        }),
      ).toHaveLength(1);
      jest.clearAllMocks();
    });
  });

  it('should only return inbound messages', async () => {
    container.httpService.mockGet(privateMessagesMockData.inbound);
    expect(
      await service.findMany(container.session, {
        folder: PrivateMessageFolder.inbound,
        unread: false,
      }),
    ).toHaveLength(2);
    jest.clearAllMocks();
  });

  it('should throw a NotFoundException when attempting to return a message with an invalid id (forbidden or non-existing)', async () => {
    container.httpService.mockGet(privateMessagesMockData.invalidId);
    await expect(service.findById('123', container.session)).rejects.toThrow(
      privateMessagesExceptions.findById.notFound,
    );
  });

  it('should throw a NotFoundException when attempting to return a message with an invalid id (forbidden or non-existing)', async () => {
    container.httpService.mockGet(privateMessagesMockData.unknownError);
    await expect(service.findById('123', container.session)).rejects.toThrow(
      privateMessagesExceptions.findById.unknownError,
    );
  });
});
