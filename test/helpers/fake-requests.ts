import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

/**
 * Triggers a fake `GET` request.
 * @param app The `NestApplication`. You need to enable end-to-end testing to be able to access this.
 * @param url The request url.
 * @example
 * import { fakeGetRequest } from "test/helpers/fake-requests";
 *
 * const request = fakeGetRequest(app, "/someRoute");
 * const response = await request.send();
 */
export const fakeGetRequest = (app: INestApplication, url: string) => {
  const httpServer = app.getHttpServer();
  const request = supertest(httpServer).get(url);
  return request;
};
