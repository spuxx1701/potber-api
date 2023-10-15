import { createTestContainer } from 'test/helpers/create-test-container';
import { AppController } from './app.controller';
import { fakeGetRequest } from 'test/helpers/fake-requests';
import { INestApplication } from '@nestjs/common';

describe('App | AppController', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const container = await createTestContainer({
      controllers: [AppController],
      enableEndToEnd: true,
    });
    app = container.app;
  });

  describe('GET /', () => {
    it('should return some information about the api', async () => {
      const request = fakeGetRequest(app, '/');
      const response = await request.send();
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('documentation');
    });
  });

  describe('GET /healthz', () => {
    it('should return the status of the api', async () => {
      const request = fakeGetRequest(app, '/healthz');
      const response = await request.send();
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({ status: 'ok' });
    });
  });
});
