import { Test } from '@nestjs/testing';
import HttpModule from 'src/http/http.module';
import PostsModule from 'src/posts/posts.module';
import PostResource, { FirstPost } from 'src/posts/resources/post.resource';
import ThreadResource, { ThreadPage } from '../resources/thread.resource';
import ThreadsService from './threads.service';
import { threadXmlMockData } from './threads.service.spec.includes';
import XmlJsService from 'src/xml-api/xml-js.service';

describe('Threads | ThreadsService', () => {
  let threadsService: ThreadsService;
  let xmljs: XmlJsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, PostsModule],
      providers: [XmlJsService, ThreadsService],
    }).compile();
    threadsService = await moduleRef.resolve(ThreadsService);
    xmljs = await moduleRef.resolve(XmlJsService);
  });

  describe('transformThread', () => {
    it('Should transform a thread.', () => {
      const actual = threadsService.transformThread(
        xmljs.parseXml(threadXmlMockData.full).elements[0],
      );
      const expected: ThreadResource = {
        id: '219289',
        title: 'Foo',
        subtitle: 'Bar',
        repliesCount: 123,
        hitsCount: 456,
        pagesCount: 3,
        isClosed: false,
        isSticky: true,
        isImportant: false,
        isAnnouncement: true,
        isGlobal: false,
        boardId: '14',
        firstPost: {
          author: {
            id: '123',
            name: 'Ameisenfutter',
            groupId: undefined,
          },
          boardId: '14',
          date: new Date(1673732641 * 1000),
          icon: '37',
          threadId: '219289',
        } as FirstPost,
        lastPost: undefined,
        page: {
          number: 1,
          postCount: 2,
          offset: 0,
          posts: [
            {
              id: '1249813752',
              author: {
                id: '123',
                name: 'Ameisenfutter',
                groupId: '3',
              },
              date: new Date(1673732641 * 1000),
              title: 'Foo',
              icon: '37',
              content: 'Hello World!',
              editedCount: 17,
              lastEdit: {
                user: {
                  id: '123',
                  name: 'Ameisenfutter',
                  groupId: undefined,
                },
                date: new Date(1673953573 * 1000),
              },
              avatarUrl: './avatare/upload/U1268185--small.png',
              threadId: '219289',
              boardId: '14',
            },
            {
              id: '1249813756',
              author: {
                id: '456',
                name: 'World',
                groupId: '3',
              },
              date: new Date(1673732787 * 1000),
              title: undefined,
              icon: undefined,
              content: 'Hello Ameisenfutter!',
              editedCount: 0,
              lastEdit: undefined,
              avatarUrl: './avatare/upload/U1268185--small.png',
              threadId: '219289',
              boardId: '14',
            },
          ] as PostResource[],
        } as ThreadPage,
      };
      expect(actual).toEqual(expected);
    });
  });
});
