import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { fakeRequest } from 'test/helpers/fake-request';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { EncodingModule } from 'src/encoding/encoding.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users.service';
import { HttpModule } from 'src/http/http.module';
import { authHandlers } from 'test/msw/handlers/auth/auth.handlers';
import { defaultMockSession } from 'test/mocks/session';
import { TestContainer, createTestContainer } from 'test/container';

describe('Auth | AuthController', () => {
  let container: TestContainer;

  beforeEach(async () => {
    container = await createTestContainer({
      imports: [HttpModule, EncodingModule, XmlApiModule, UsersModule],
      controllers: [AuthController],
      providers: [AuthService, UsersService],
      enableEndToEnd: true,
    });
  });

  afterEach(() => {
    container.mockServer.close();
  });

  describe('/auth/login', () => {
    it('should be successful', async () => {
      container.mockServer.use(...authHandlers.login.success);
      const request = fakeRequest(container.app, 'POST', '/auth/login');
      const response = await request.send({
        username: 'Foo',
        password: 'Bar',
        lifetime: 3600,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.access_token).toBeDefined();
    });

    it('should fail with 401', async () => {
      container.mockServer.use(...authHandlers.login.failure);
      const request = fakeRequest(container.app, 'POST', '/auth/login');
      const response = await request.send({
        username: 'Foo',
        password: 'Bar',
        lifetime: 3600,
      });
      expect(response.statusCode).toBe(401);
      expect(response.body).toStrictEqual({
        error: 'Unauthorized',
        message: 'Login failed (possibly due to wrong credentials).',
        statusCode: 401,
      });
    });

    it('should fail with 403 if the user account has been locked permanently', async () => {
      container.mockServer.use(...authHandlers.login.lockedPermanently);
      const request = fakeRequest(container.app, 'POST', '/auth/login');
      const response = await request.send({
        username: 'Foo',
        password: 'Bar',
        lifetime: 3600,
      });
      expect(response.statusCode).toBe(403);
      expect(response.body).toStrictEqual({
        error: 'Forbidden',
        message:
          'The account has been locked permanently. potber-api does not support permenently locked accounts logging in.',
        statusCode: 403,
      });
    });

    it('should succeed if the user account has been locked termporarily', async () => {
      container.mockServer.use(...authHandlers.login.lockedTemporarily);
      const request = fakeRequest(container.app, 'POST', '/auth/login');
      const response = await request.send({
        username: 'Foo',
        password: 'Bar',
        lifetime: 3600,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.access_token).toBeDefined();
    });
  });

  describe('/auth/session', () => {
    it('should return the session details', async () => {
      const request = fakeRequest(container.app, 'GET', '/auth/session');
      const response = await request.send();
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(defaultMockSession);
    });

    it('should fail with 401', async () => {
      const request = fakeRequest(container.app, 'GET', '/auth/session', {
        mockSession: false,
      });
      const response = await request.send();
      expect(response.statusCode).toBe(401);
      expect(response.body).toStrictEqual({
        message: 'Unauthorized',
        statusCode: 401,
      });
    });
  });
});
