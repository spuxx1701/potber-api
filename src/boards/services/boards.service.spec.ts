import { Test } from '@nestjs/testing';
import { HttpModule } from 'src/http/http.module';
import { ThreadsModule } from 'src/threads/threads.module';
import { UsersModule } from 'src/users/users.module';
import { XmlJsService } from 'src/xml-api/xml-js.service';
import { BoardResource } from '../resources/board.resource';
import { BoardsService } from './boards.service';
import { boardXmlMockData } from './boards.service.spec.includes';

describe('Boards | BoardsService', () => {
  let xmljs: XmlJsService;
  let boardsService: BoardsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, ThreadsModule, UsersModule],
      providers: [XmlJsService, BoardsService],
    }).compile();
    xmljs = await moduleRef.resolve(XmlJsService);
    boardsService = await moduleRef.resolve(BoardsService);
  });

  describe('transformBoard', () => {
    it("Should properly transform a board from the 'board.php' endpoint.", () => {
      const actual = boardsService.transformBoard(
        xmljs.parseXml(boardXmlMockData.full).elements[0],
      );
      const expected: BoardResource = {
        id: '14',
        name: 'Public Offtopic',
        description:
          'fÃŒr das was nicht passt und sonstige geistige HÃ¶henflÃŒge',
        moderators: undefined,
        threadsCount: 46587,
        repliesCount: 13987822,
        categoryId: '6',
        page: {
          number: 1,
          stickiesCount: 1,
          globalsCount: 1,
          threadsCount: 30,
          threads: [
            {
              id: '211035',
              title: 'Neue Forensatzung',
              subtitle: 'vom 23.05.2019',
              repliesCount: 0,
              hitsCount: 989710,
              pagesCount: 1,
              isClosed: true,
              isSticky: true,
              isImportant: true,
              isAnnouncement: true,
              isGlobal: true,
              boardId: '14',
              firstPost: {
                author: {
                  groupId: undefined,
                  id: '18237',
                  name: 'krang',
                  locked: false,
                },
                boardId: '14',
                date: new Date(1372196100000),
                icon: '39',
                threadId: '211035',
              },
              lastPost: undefined,
              page: undefined,
            },
            {
              id: '36283',
              title: 'Die Regeln des Public Off-Topic & Sammelthreadliste',
              subtitle: 'die Regeln sind einzuhalten!',
              repliesCount: 0,
              hitsCount: 411760,
              pagesCount: 1,
              isClosed: true,
              isSticky: false,
              isImportant: true,
              isAnnouncement: true,
              isGlobal: false,
              boardId: '14',
              firstPost: {
                author: {
                  groupId: undefined,
                  id: '32460',
                  name: 'dX',
                  locked: false,
                },
                boardId: '14',
                date: new Date(1073386784000),
                icon: undefined,
                threadId: '36283',
              },
              lastPost: {
                author: {
                  groupId: undefined,
                  id: '21088',
                  name: 'Che Guevara',
                  locked: false,
                },
                boardId: '14',
                date: new Date(1571207383000),
                threadId: '36283',
              },
              page: undefined,
            },
            {
              id: '219039',
              title: 'Anti-Hass X',
              subtitle: 'Besser positiv denken als positiv testen',
              repliesCount: 365,
              hitsCount: 19166,
              pagesCount: 13,
              isClosed: false,
              isSticky: false,
              isImportant: false,
              isAnnouncement: false,
              isGlobal: false,
              boardId: '14',
              firstPost: {
                author: {
                  groupId: undefined,
                  id: '1085380',
                  name: 'SETIssl',
                  locked: false,
                },
                boardId: '14',
                date: new Date(1647090092000),
                icon: '2',
                threadId: '219039',
              },
              lastPost: {
                author: {
                  groupId: undefined,
                  id: '1328842',
                  name: 'zapedusa',
                  locked: false,
                },
                boardId: '14',
                date: new Date(1674637246000),
                threadId: '219039',
              },
              page: undefined,
            },
          ],
        },
      };
      expect(actual).toEqual(expected);
    });
  });
});
