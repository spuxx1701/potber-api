import { INestApplication } from '@nestjs/common';
import { createTestContainer } from 'test/helpers/create-test-container';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { fakeRequest } from 'test/helpers/fake-request';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { EncodingModule } from 'src/encoding/encoding.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/services/users.service';
import { HttpModule } from 'src/http/http.module';
import { SetupServer } from 'msw/lib/node';
import { authHandlers } from 'test/msw/handlers/auth/auth.handlers';

describe('Auth | AuthController', () => {
  let app: INestApplication;
  let mockServer: SetupServer;

  beforeEach(async () => {
    const container = await createTestContainer({
      imports: [
        HttpModule,
        EncodingModule,
        XmlApiModule,
        JwtModule.registerAsync({
          useFactory: async () => ({
            secret: 'foo',
          }),
          inject: [ConfigService],
        }),
        UsersModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, UsersService],
      enableEndToEnd: true,
    });
    app = container.app;
    mockServer = container.mockServer;
  });

  afterEach(() => {
    mockServer.close();
  });

  describe('/auth/login', () => {
    it('should be successful', async () => {
      mockServer.use(...authHandlers.login.success);
      const request = fakeRequest(app, 'POST', '/auth/login');
      const response = await request.send({
        username: 'Foo',
        password: 'Bar',
        lifetime: 3600,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.access_token).toBeDefined();
    });
  });
});
