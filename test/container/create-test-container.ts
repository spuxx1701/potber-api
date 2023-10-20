import {
  DynamicModule,
  ExecutionContext,
  ForwardReference,
  INestApplication,
  LoggerService,
  Provider,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SessionResource } from 'src/auth/resources/session.resource';
import { ConfigModule } from '@nestjs/config';
import { RequestHandler, rest } from 'msw';
import { SetupServer } from 'msw/node';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { defaultMockSession } from 'test/mocks/session';
import { createMockServer } from 'test/msw/create-mock-server';
import { TestContainer } from './test-container';

/**
 * Creates a new `TestContainer` instance that allows integrated and end-to-end testing.
 * @param options.imports (optional) A list of imports you need for testing.
 * @param options.providers (optional) A list of providers you need for testing.
 * @param options.controller (optional) A list of controllers you need for testing.
 * @param options.logger (optional) A custom logger can be provided. Helpful when you want to spy on logging functionality.
 * @param options.mockSession (optional) Provide a custom session resource or false. When a custom session resource was provided, it will be checked against during authentication checks. If `false` was provided, all incomind requests will be considered authenticated.
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
  mockSession?: Partial<SessionResource> | false;
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

  if (enableEndToEnd) {
    // Load necessary components for authentication to work
    imports.push(
      JwtModule.registerAsync({
        useFactory: async () => ({
          secret: process.env.AUTH_JWT_SECRET,
        }),
      }),
    );
    providers.push(JwtStrategy);
  }

  let builder = Test.createTestingModule({
    imports,
    providers,
    controllers,
  });

  // Mock the jwt strategy
  builder.overrideGuard(JwtAuthGuard).useValue({
    canActivate: (context: ExecutionContext) => {
      if (!mockSession) {
        // If no mock session was not provided, all incoming requests will be considered authenticated
        return true;
      } else {
        // If a mock session was provided, we will turn down all incoming requests that do not match the provided session
        const request: Request = context.switchToHttp().getRequest();
        const authorization = request.header('Mock-Session');
        if (authorization === JSON.stringify(mockSession)) {
          request.user = { ...mockSession };
          return true;
        }
        throw new UnauthorizedException();
      }
    },
  });

  if (logger) {
    builder = builder.setLogger(options.logger);
  }

  const module = await builder.compile();

  let app: INestApplication | undefined;
  let mockServer: SetupServer | undefined;
  if (enableEndToEnd) {
    app = await createEndToEndNestApplication(module);
    mockServer = createMockServer(requestHandlers);
  }

  return TestContainer.create({
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
