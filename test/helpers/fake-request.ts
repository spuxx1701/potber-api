import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

/**
 * Triggers a fake request.
 * @param app The `NestApplication`. You need to enable end-to-end testing to be able to access this.
 * @param method The request method.
 * @param url The request url.
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
) => {
  const httpServer = app.getHttpServer();
  const request = supertest(httpServer)[method.toLowerCase()](url);
  return request;
};
