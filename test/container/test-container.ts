import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { SetupServer } from 'msw/lib/node';
import { SessionResource } from 'src/auth/resources/session.resource';

/**
 * `TestContainer` provides a simulated Nest.js application for testing purposes.
 * It essentially wraps Nest's `Test.createTestContainer()`, but offers a customized
 * API for easier use and access.
 * @param module The testing module.
 * @param app (optional) The nest application. Will be undefined unless end-to-end testing was enabled during the call of `createTestContainer()`.
 * @param mockServer (optional) The `msw` mock server. Will be undefined unless end-to-end testing was enabled during the call of `createTestContainer()`.
 * @param session (optional) The mocked session. Will be undefined unless `mockSession` was provided during the call of `createTestContainer()`.
 */
export class TestContainer {
  public static _instance: TestContainer;

  module: TestingModule;
  app?: INestApplication;
  mockServer?: SetupServer;
  session?: SessionResource;

  protected constructor(init: Partial<TestContainer>) {
    Object.assign(this, init);
  }

  public static create(init: Partial<TestContainer>) {
    if (this._instance) this.destroy();
    this._instance = new TestContainer(init);
    return this._instance;
  }

  public static destroy() {
    if (this._instance) {
      this._instance.mockServer?.close();
      this._instance = undefined;
    }
  }
}
