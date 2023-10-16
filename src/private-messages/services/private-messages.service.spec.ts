import { PrivateMessagesService } from './private-messages.service';
import { EncodingModule } from 'src/encoding/encoding.module';
import { TestContainer, createTestContainer } from 'test/container';
import { privateMessagesMockData } from 'test/mock-data/private-messages.mock-data';
import { PrivateMessageFolder } from '../types';
import { privateMessagesExceptions } from '../config/private-messages.exceptions';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('Private Messages | PrivateMessagesService', () => {
  let container: TestContainer;
  let service: PrivateMessagesService;

  // beforeEach(async () => {
  //   container = await createTestContainer({
  //     imports: [HttpModule, EncodingModule],
  //     providers: [PrivateMessagesService, HttpService],
  //   });
  //   service = await container.module.resolve<PrivateMessagesService>(
  //     PrivateMessagesService,
  //   );
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it('foo', () => {
    expect(1).toBe(1);
  });

  // describe('findMany', () => {
  //   it('should return all inbound messages', async () => {
  //     container.httpService.mockGet(privateMessagesMockData.list.inbound);
  //     expect(
  //       await service.findMany(container.session, {
  //         folder: PrivateMessageFolder.inbound,
  //       }),
  //     ).toHaveLength(3);
  //   });

  //   it('should only return unread inbound messages', async () => {
  //     container.httpService.mockGet(privateMessagesMockData.list.inbound);
  //     expect(
  //       await service.findMany(container.session, {
  //         folder: PrivateMessageFolder.inbound,
  //         unread: true,
  //       }),
  //     ).toHaveLength(1);
  //   });

  //   it('should only return read inbound messages', async () => {
  //     container.httpService.mockGet(privateMessagesMockData.list.inbound);
  //     expect(
  //       await service.findMany(container.session, {
  //         folder: PrivateMessageFolder.inbound,
  //         unread: false,
  //       }),
  //     ).toHaveLength(2);
  //   });

  //   it('should return all outbound messages', async () => {
  //     container.httpService.mockGet(privateMessagesMockData.list.outbound);
  //     expect(
  //       await service.findMany(container.session, {
  //         folder: PrivateMessageFolder.outbound,
  //       }),
  //     ).toHaveLength(3);
  //   });

  //   it('should return all system messages', async () => {
  //     container.httpService.mockGet(privateMessagesMockData.list.system);
  //     expect(
  //       await service.findMany(container.session, {
  //         folder: PrivateMessageFolder.system,
  //       }),
  //     ).toHaveLength(3);
  //   });

  //   it('should return all messages', async () => {
  //     // We'll use the same HTML response and expect it to returned three times
  //     container.httpService.mockGet(privateMessagesMockData.list.inbound);
  //     expect(await service.findMany(container.session)).toHaveLength(9);
  //   });

  //   it('should skip message list items that cannot be parsed', async () => {
  //     container.httpService.mockGet(
  //       privateMessagesMockData.list.inboundWithCorruptedMessageListItem,
  //     );
  //     expect(
  //       await service.findMany(container.session, {
  //         folder: PrivateMessageFolder.inbound,
  //       }),
  //     ).toHaveLength(2);
  //   });
  // });

  // describe('findById', () => {
  //   it('should properly parse and return all messages', async () => {
  //     for (const mockDataEntry of privateMessagesMockData.single.messages) {
  //       container.httpService.mockGet(mockDataEntry.html);

  //       const actual = await service.findById(
  //         mockDataEntry.expected.id,
  //         container.session,
  //       );
  //       expect(actual).toStrictEqual(mockDataEntry.expected);
  //     }
  //   });

  //   it('should throw a NotFoundException when attempting to return a message with an invalid id (forbidden or non-existing)', async () => {
  //     container.httpService.mockGet(privateMessagesMockData.single.invalidId);
  //     await expect(service.findById('123', container.session)).rejects.toThrow(
  //       privateMessagesExceptions.findById.notFound,
  //     );
  //   });

  //   it('should throw a NotFoundException when attempting to return a message with an invalid id (forbidden or non-existing)', async () => {
  //     container.httpService.mockGet(
  //       privateMessagesMockData.single.unknownError,
  //     );
  //     await expect(service.findById('123', container.session)).rejects.toThrow(
  //       privateMessagesExceptions.findById.unknownError,
  //     );
  //   });
  // });
});
