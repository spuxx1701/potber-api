import { TestContainer, createTestContainer } from 'test/container';
import { UsersModule } from './users.module';
import { usersHandlers } from 'test/msw/handlers/users/users.handlers';
import { fakeRequest } from 'test/helpers/fake-request';

describe('Users', () => {
  let container: TestContainer;

  beforeEach(async () => {
    container = await createTestContainer({
      imports: [UsersModule],
      enableEndToEnd: true,
    });
  });

  describe('GET /usernames', () => {
    it('should return a list of matching usernames', async () => {
      container.mockServer.use(...usersHandlers.usernames.success.threeMatches);
      const request = fakeRequest(
        container.app,
        'GET',
        `/usernames?startsWith=Foo`,
      );
      const response = await request.send();
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(['Foo', 'FooBar', 'FooMaster']);
    });

    it('should return an empty list of usernames', async () => {
      container.mockServer.use(...usersHandlers.usernames.success.noMatches);
      const request = fakeRequest(
        container.app,
        'GET',
        `/usernames?startsWith=some-very-long-input-that-does-not-match-any-username`,
      );
      const response = await request.send();
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([]);
    });

    it("should fail due to missing 'startsWith' query parameter", async () => {
      const request = fakeRequest(container.app, 'GET', `/usernames`);
      const response = await request.send();
      expect(response.status).toBe(400);
    });
  });
});
