import {
  TestContainer,
  createTestContainer,
} from 'test/helpers/create-test-container';
import { PostsController } from './posts.controller';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { EncodingModule } from 'src/encoding/encoding.module';
import { ThreadsModule } from 'src/threads/threads.module';
import { UsersModule } from 'src/users/users.module';
import { postsMockData } from 'test/mock-data/posts.mock-data';
import { PostsService } from '../services/posts.services';
import { UsersService } from 'src/users/services/users.service';
import { ThreadsService } from 'src/threads/services/threads.service';

describe('Posts', () => {
  describe('PostsController', () => {
    describe('authenticated', () => {
      let container: TestContainer;
      let controller: PostsController;

      beforeEach(async () => {
        container = await createTestContainer({
          imports: [EncodingModule, XmlApiModule],
          controllers: [PostsController],
          providers: [PostsService, UsersService, ThreadsService],
        });
        controller = container.module.get<PostsController>(PostsController);
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      describe('quote', () => {
        it('foo', async () => {
          const id = '123';
          container.httpService.mockGet(postsMockData.quote.html);
          const actual = await controller.quote(id, {
            user: { cookie: 'foo' },
          });
          expect(actual).toStrictEqual(postsMockData.quote.expected);
        });
      });
    });
  });
});
