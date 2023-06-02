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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findMany', () => {
    it('should return all inbound messages', async () => {
      container.httpService.mockGet(privateMessagesMockData.inbound);
      expect(
        await service.findMany(container.session, {
          folder: PrivateMessageFolder.inbound,
        }),
      ).toHaveLength(3);
    });

    it('should only return unread inbound messages', async () => {
      container.httpService.mockGet(privateMessagesMockData.inbound);
      expect(
        await service.findMany(container.session, {
          folder: PrivateMessageFolder.inbound,
          unread: true,
        }),
      ).toHaveLength(1);
    });
  });

  it('should only return read inbound messages', async () => {
    container.httpService.mockGet(privateMessagesMockData.inbound);
    expect(
      await service.findMany(container.session, {
        folder: PrivateMessageFolder.inbound,
        unread: false,
      }),
    ).toHaveLength(2);
  });

  it('should return all outbound messages', async () => {
    container.httpService.mockGet(privateMessagesMockData.outbound);
    expect(
      await service.findMany(container.session, {
        folder: PrivateMessageFolder.outbound,
      }),
    ).toHaveLength(3);
  });

  it('should return all system messages', async () => {
    container.httpService.mockGet(privateMessagesMockData.system);
    expect(
      await service.findMany(container.session, {
        folder: PrivateMessageFolder.system,
      }),
    ).toHaveLength(3);
  });

  it('should return all messages', async () => {
    // We'll use the same HTML response and expect it to returned three times
    container.httpService.mockGet(privateMessagesMockData.inbound);
    expect(await service.findMany(container.session)).toHaveLength(9);
  });

  it('should skip message list items that cannot be parsed', async () => {
    container.httpService.mockGet(
      privateMessagesMockData.inboundWithCorruptedMessageListItem,
    );
    expect(
      await service.findMany(container.session, {
        folder: PrivateMessageFolder.inbound,
      }),
    ).toHaveLength(2);
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
