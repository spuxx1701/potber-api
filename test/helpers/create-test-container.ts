import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  LoggerService,
  Provider,
  Type,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockHttpService } from './mock-http-service';
import { SessionResource } from 'src/auth/resources/session.resource';
import { HttpService } from 'src/http/http.service';
import { defaultMockSession } from './mock-session';

/**
 * `TestContainer` provides a simulated Nest.js application for testing purposes.
 * It essentially wraps Nest's `Test.createTestContainer()`, but offers a customized
 * API for easier use and access.
 * @param module The testing module.
 * @param httpService The mocked `HttpService` that is used to mock outgoing HTTP requests.
 * @param app (optional) The nest application. Will be undefined unless end-to-end testing was enabled during the call of `createTestContainer()`.
 * @param session (optional) The mocked session. Will be undefined unless `mockSession` was provided during the call of `createTestContainer()`.
 */
export class TestContainer {
  module: TestingModule;
  httpService: MockHttpService;
  app?: INestApplication;
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
}) {
  const {
    imports,
    providers,
    controllers,
    logger,
    mockSession,
    enableEndToEnd,
  } = {
    imports: [],
    providers: [],
    controllers: [],
    mockSession: { ...defaultMockSession },
    ...options,
  };

  providers.push({
    provide: HttpService,
    useClass: MockHttpService,
  });

  let builder = Test.createTestingModule({
    imports,
    providers,
    controllers,
  });

  if (logger) {
    builder = builder.setLogger(options.logger);
  }

  const module = await builder.compile();
  const httpService = module.get<HttpService>(
    HttpService,
  ) as any as MockHttpService;

  let app: INestApplication | undefined;
  if (enableEndToEnd) {
    app = await createEndToEndNestApplication(module);
  }

  return new TestContainer({
    module,
    httpService,
    app,
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
