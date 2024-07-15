import { TestContainer, createTestContainer } from 'test/container';
import { ThreadsModule } from './threads.module';
import { threadsHandlers } from 'test/msw/handlers/threads/threads.handlers';
import { fakeRequest } from 'test/helpers/fake-request';
import { ThreadCreateResource } from './resources/thread.create.resource';
import { ThreadReadResource } from './resources/thread.read.resource';

describe('Threads | e2e', () => {
  let container: TestContainer;

  beforeEach(async () => {
    container = await createTestContainer({
      imports: [ThreadsModule],
      enableEndToEnd: true,
    });
  });

  describe('POST /threads', () => {
    it('should successfully create a new thread', async () => {
      container.mockServer.use(...threadsHandlers.create.success);
      const request = fakeRequest(container.app, 'POST', '/threads');
      const response = await request.send({
        boardId: '75',
        title: 'neuer thread',
        openingPost: {
          title: 'dies ist ein neuer thread',
          message: 'das ist der startpost',
          icon: '37',
        },
      } as ThreadCreateResource);
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({
        boardId: '75',
        title: 'neuer thread',
        subtitle: 'dies ist ein neuer thread',
        firstPost: {
          author: {
            id: '1268185',
            name: 'Ameisenfutter',
            locked: false,
          },
          boardId: '75',
          date: '2023-10-26T18:23:48.000Z' as unknown as Date,
          icon: '37',
          threadId: '219501',
        },
        hitsCount: 6,
        id: '219501',
        isAnnouncement: false,
        isClosed: false,
        isGlobal: false,
        isImportant: false,
        isSticky: false,
        page: {
          number: 1,
          offset: 0,
          postCount: 1,
          posts: [
            {
              author: {
                id: '1268185',
                name: 'Ameisenfutter',
                groupId: '3',
                locked: false,
              },
              avatarUrl:
                'https://forum.mods.de/bb/avatare/upload/U1268185--small.png',
              boardId: '75',
              date: '2023-10-26T18:23:48.000Z' as unknown as Date,
              contentHidden: false,
              editedCount: 0,
              icon: '37',
              id: '1250038718',
              threadId: '219501',
              title: 'dies ist ein neuer thread',
              message: 'das ist der startpost',
            },
          ],
        },
        pagesCount: 1,
        repliesCount: 0,
      } as ThreadReadResource);
    });

    it('should return 401', async () => {
      const request = fakeRequest(container.app, 'POST', '/threads', {
        mockSession: false,
      });
      const response = await request.send({
        boardId: '75',
        title: 'neuer thread',
        openingPost: {
          title: 'dies ist ein neuer thread',
          message: 'das ist der startpost',
          icon: '37',
        },
      } as ThreadCreateResource);
      expect(response.status).toBe(401);
    });

    it('should return 403', async () => {
      container.mockServer.use(...threadsHandlers.create.forbidden);
      const request = fakeRequest(container.app, 'POST', '/threads');
      const response = await request.send({
        boardId: '403',
        title: 'hier darf ich keinen thread erstellen',
        openingPost: {
          message: 'wirklich schade',
        },
      } as ThreadCreateResource);
      expect(response.status).toBe(403);
    });

    it('should fail validation due to missing title', async () => {
      const request = fakeRequest(container.app, 'POST', '/threads');
      const response = await request.send({
        boardId: '75',
        title: '',
        openingPost: {
          title: 'dies ist ein neuer thread',
          message: 'das ist der startpost',
          icon: '37',
        },
      } as ThreadCreateResource);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'title must be longer than or equal to 1 characters',
      );
    });

    it('should fail validation due to missing message', async () => {
      const request = fakeRequest(container.app, 'POST', '/threads');
      const response = await request.send({
        boardId: '75',
        title: 'neuer thread',
        openingPost: {
          title: 'dies ist ein neuer thread',
          message: '',
          icon: '37',
        },
      } as ThreadCreateResource);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'openingPost.message must be longer than or equal to 1 characters',
      );
    });

    it('should fail validation due to missing message', async () => {
      const request = fakeRequest(container.app, 'POST', '/threads');
      const response = await request.send({
        boardId: '',
        title: 'neuer thread',
        openingPost: {
          title: 'dies ist ein neuer thread',
          message: 'das ist der startpost',
          icon: '37',
        },
      } as ThreadCreateResource);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'boardId must be a number string',
      );
    });
  });
});
