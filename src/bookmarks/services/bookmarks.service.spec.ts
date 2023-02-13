import { Test } from '@nestjs/testing';
import { HttpModule } from 'src/http/http.module';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { XmlJsService } from 'src/xml-api/xml-js.service';
import { BookmarksSummaryResource } from '../resources/bookmarks-summary.resource';
import { BookmarksService } from './bookmarks.service';
import { bookmarksMockData } from './bookmarks.service.spec.includes';

describe('Bookmarks | BookmarksService', () => {
  let xmljs: XmlJsService;
  let bookmarksService: BookmarksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, XmlApiModule],
      providers: [XmlJsService, BookmarksService],
    }).compile();
    xmljs = await moduleRef.resolve(XmlJsService);
    bookmarksService = await moduleRef.resolve(BookmarksService);
  });

  describe('transformBookmarksSummary', () => {
    it("Should properly transform the bookmarks summary object from the 'bookmarks.php' endpoint.", () => {
      const actual = bookmarksService.transformBookmarksSummary(
        xmljs.parseXml(bookmarksMockData.normal),
      );
      const expected: BookmarksSummaryResource = {
        userId: '123',
        count: 3,
        newPostsCount: 6,
        bookmarks: [
          {
            id: '1',
            postId: '1249805857',
            newPostsCount: 0,
            thread: {
              id: '199729',
              title: 'Der Grafikkarten-Thread',
              isClosed: false,
              pagesCount: 131,
            },
            board: {
              id: '10',
              name: 'Hardware & Netzwerk',
            },
            removeToken: '123',
          },
          {
            id: '2',
            postId: '1249820038',
            newPostsCount: 6,
            thread: {
              id: '194906',
              title: 'Hardware-Kaufberatung',
              isClosed: false,
              pagesCount: 1287,
            },
            board: {
              id: '10',
              name: 'Hardware & Netzwerk',
            },
            removeToken: '456',
          },
          {
            id: '3',
            postId: '1249782727',
            newPostsCount: 0,
            thread: {
              id: '90343',
              title: 'Hardwarekauf oder -tausch',
              isClosed: false,
              pagesCount: 183,
            },
            board: {
              id: '10',
              name: 'Hardware & Netzwerk',
            },
            removeToken: '789',
          },
        ],
      };
      expect(actual).toEqual(expected);
    });
  });
});
