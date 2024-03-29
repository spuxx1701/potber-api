import { Test } from '@nestjs/testing';
import { HttpModule } from 'src/http/http.module';
import { PostsModule } from 'src/posts/posts.module';
import { PostReadResource } from 'src/posts/resources/post.read.resource';
import { ThreadReadResource } from '../resources/thread.read.resource';
import { ThreadsService } from './threads.service';
import { threadXmlMockData } from './threads.service.spec.includes';
import { XmlJsService } from 'src/xml-api/xml-js.service';
import { ThreadPageResource } from '../resources/thread-page.resource';
import { PostPreviewResource } from 'src/posts/resources/post.preview.resource';
import { EncodingModule } from 'src/encoding/encoding.module';

describe('Threads | ThreadsService', () => {
  let threadsService: ThreadsService;
  let xmljs: XmlJsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, PostsModule, EncodingModule],
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
      const expected: ThreadReadResource = {
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
            locked: false,
          },
          boardId: '14',
          date: new Date(1673732641 * 1000),
          icon: '37',
          threadId: '219289',
        } as PostPreviewResource,
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
                locked: false,
              },
              date: new Date(1673732641 * 1000),
              title: 'Foo',
              icon: '37',
              message: 'Hello World!',
              contentHidden: false,
              editedCount: 17,
              lastEdit: {
                user: {
                  id: '123',
                  name: 'Ameisenfutter',
                  groupId: undefined,
                  locked: false,
                },
                date: new Date(1673953573 * 1000),
              },
              avatarUrl:
                'https://forum.mods.de/bb/avatare/upload/U1268185--small.png',
              threadId: '219289',
              boardId: '14',
            },
            {
              id: '1249813756',
              author: {
                id: '456',
                name: 'World',
                groupId: '3',
                locked: false,
              },
              date: new Date(1673732787 * 1000),
              title: undefined,
              icon: undefined,
              message: 'Hello Ameisenfutter!',
              contentHidden: false,
              editedCount: 0,
              lastEdit: undefined,
              avatarUrl:
                'https://forum.mods.de/bb/avatare/upload/U1268185--small.png',
              threadId: '219289',
              boardId: '14',
            },
          ] as PostReadResource[],
        } as ThreadPageResource,
      };
      expect(actual).toEqual(expected);
    });
  });
});
