import { INestApplication } from '@nestjs/common';
import { SessionResource } from 'src/auth/resources/session.resource';
import * as supertest from 'supertest';
import { defaultMockSession } from 'test/mocks/session';

/**
 * Triggers a fake request.
 * @param app The `NestApplication`. You need to enable end-to-end testing to be able to access this.
 * @param method The request method.
 * @param url The request url.
 * @param options.session (optional) You may optionally provide a session. If none is provided, `defaultMockSession` will be used. Session can be disabled alltogether by providing `false`.
 * @example
 * import { fakeRequest } from "test/helpers/fake-requests";
 *
 * // Trigger a bodyless request
 * const request = fakeRequest(app, "GET", "/someRoute");
 * const response = await request.send();
 *
 * // Or trigger a request with a body
 * const request = fakeRequest(app, "GET", "/someRoute");
 * const response= await request.send({ foo: bar });
 */
export const fakeRequest = (
  app: INestApplication,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: { mockSession?: Partial<SessionResource> | false },
) => {
  const { mockSession } = {
    mockSession: { ...defaultMockSession },
    ...options,
  };
  const httpServer = app.getHttpServer();
  const request: supertest.Test =
    supertest(httpServer)[method.toLowerCase()](url);
  if (mockSession) {
    request.set('Mock-Session', JSON.stringify(mockSession));
  }
  return request;
};
