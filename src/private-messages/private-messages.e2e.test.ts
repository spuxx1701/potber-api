import { TestContainer, createTestContainer } from 'test/container';
import { PrivateMessagesModule } from './private-messages.module';
import { privateMessagesHandlers } from 'test/msw/handlers/private-messages/private-messages.handlers';
import { fakeRequest } from 'test/helpers/fake-request';

describe('Private Messages | e2e', () => {
  let container: TestContainer;

  beforeEach(async () => {
    container = await createTestContainer({
      imports: [PrivateMessagesModule],
      enableEndToEnd: true,
    });
  });

  describe('POST /privateMessages', () => {
    it('should be successful', async () => {
      container.mockServer.use(...privateMessagesHandlers.send.success);
      const request = fakeRequest(container.app, 'POST', '/privateMessages');
      const response = await request.send({
        recipientName: '[potber]Kantholz',
        title: 'Hello World!',
        content: 'This is Houston!',
      });
      expect(response.status).toBe(201);
    });

    it('should return 401', async () => {
      const request = fakeRequest(container.app, 'POST', '/privateMessages', {
        mockSession: false,
      });
      const response = await request.send({
        recipientName: '[potber]Kantholz',
        title: 'Hello World!',
        content: 'This is Houston!',
      });
      expect(response.status).toBe(401);
    });

    it('should return 400 due to missing title', async () => {
      const request = fakeRequest(container.app, 'POST', '/privateMessages');
      const response = await request.send({
        recipientName: '[potber]Kantholz',
        title: '',
        content: 'This is Houston!',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('title should not be empty');
    });

    it('should return 400 due to missing content', async () => {
      const request = fakeRequest(container.app, 'POST', '/privateMessages');
      const response = await request.send({
        recipientName: '[potber]Kantholz',
        title: 'Hello World!',
        content: '',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('content should not be empty');
    });

    it('should return 400 due to missing recipient name', async () => {
      const request = fakeRequest(container.app, 'POST', '/privateMessages');
      const response = await request.send({
        recipientName: '',
        title: 'Hello World!',
        content: 'This is Houston!',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'recipientName should not be empty',
      );
    });

    it('should return 400 due to an invalid recipient name', async () => {
      container.mockServer.use(...privateMessagesHandlers.send.invalidUser);
      const request = fakeRequest(container.app, 'POST', '/privateMessages');
      const response = await request.send({
        recipientName: 'non-existant-user',
        title: 'Hello World!',
        content: 'This is Houston!',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Recipient does not exist.');
    });
  });
});
