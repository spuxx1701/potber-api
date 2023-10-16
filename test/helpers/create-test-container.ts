import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  LoggerService,
  Provider,
  Type,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SessionResource } from 'src/auth/resources/session.resource';
import { defaultMockSession } from './mock-session';
import { ConfigModule } from '@nestjs/config';
import { RequestHandler, rest } from 'msw';
import { SetupServer, setupServer } from 'msw/node';

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
  module: TestingModule;
  app?: INestApplication;
  mockServer?: SetupServer;
  session?: SessionResource;

  constructor(init: Partial<TestContainer>) {
    Object.assign(this, init);
  }
}

/**
 * Creates a new `TestContainer` instance that allows integrated and end-to-end testing.
 * @param options.imports (optional) A list of imports you need for testing.
 * @param options.providers (optional) A list of providers you need for testing.
 * @param options.controller (optional) A list of controllers you need for testing.
 * @param options.logger (optional) A custom logger can be provided. Helpful when you want to spy on logging functionality.
 * @param options.enableEndToEnd (optional) If enabled, the container will provide an environment that is capable of testing end-to-end.
 * @param options.requestHandlers (optional) An list of request handlers to set as default handlers for the `msw` mock server. Has no effect if end-to-end testing was not enabled.
 * @param options.disableConfig (optional) If disabled, the container will not load the default config.
 * @returns
 */
export async function createTestContainer(options: {
  imports?: (
    | Type<any>
    | DynamicModule
    | Promise<DynamicModule>
    | ForwardReference<any>
  )[];
  providers?: Provider[];
  controllers?: Type<any>[];
  logger?: LoggerService;
  mockSession?: Partial<SessionResource>;
  enableEndToEnd?: boolean;
  requestHandlers?: RequestHandler<any>[];
  disableDefaultConfig?: boolean;
}) {
  const {
    imports,
    providers,
    controllers,
    logger,
    mockSession,
    enableEndToEnd,
    disableDefaultConfig,
    requestHandlers,
  } = {
    imports: [],
    providers: [],
    controllers: [],
    requestHandlers: [
      rest.get('dummy-handler', (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    ],
    mockSession: { ...defaultMockSession },
    ...options,
  };

  if (!disableDefaultConfig) {
    imports.push(ConfigModule.forRoot({ isGlobal: true }));
  }

  let builder = Test.createTestingModule({
    imports,
    providers,
    controllers,
  });

  if (logger) {
    builder = builder.setLogger(options.logger);
  }

  const module = await builder.compile();

  let app: INestApplication | undefined;
  let mockServer: SetupServer | undefined;
  if (enableEndToEnd) {
    app = await createEndToEndNestApplication(module);
    mockServer = setupServer(...requestHandlers);
    mockServer.listen();
  }

  return new TestContainer({
    module,
    app,
    mockServer,
    session: mockSession as SessionResource,
  });
}

const createEndToEndNestApplication = async (
  module: TestingModule,
): Promise<INestApplication> => {
  const app = module.createNestApplication();
  await app.init();
  return app;
};
