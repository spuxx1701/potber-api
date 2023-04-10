import {
  DynamicModule,
  ForwardReference,
  LoggerService,
  Provider,
  Type,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockHttpService } from './mock-http-service';
import { SessionResource } from 'src/auth/resources/session.resource';
import { HttpService } from 'src/http/http.service';

export class TestContainer {
  module: TestingModule;
  httpService: MockHttpService;
  session?: SessionResource;

  constructor(init: Partial<TestContainer>) {
    Object.assign(this, init);
  }
}

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
  mockHttp?: boolean;
  mockSession?: Partial<SessionResource> | boolean;
}) {
  const imports = [...(options.imports || [])];
  const providers = [...(options.providers || [])];
  const controllers = [...(options.controllers || [])];

  if (options?.mockHttp) {
    providers.push({
      provide: HttpService,
      useClass: MockHttpService,
    });
  }
  let session: SessionResource | undefined;
  if (options.mockSession) {
    const defaultMockSession: SessionResource = {
      username: 'MockUser',
      userId: '123',
      avatarUrl: 'mock-user-avatar-url',
      cookie: 'mock-session-cookie',
    };
    if (typeof options.mockSession === 'boolean') {
      session = defaultMockSession;
    } else {
      session = { ...defaultMockSession, ...options.mockSession };
    }
  }

  let builder = Test.createTestingModule({
    imports,
    providers,
    controllers,
  });

  if (options.logger) {
    builder = builder.setLogger(options.logger);
  }

  const module = await builder.compile();
  const httpService = module.get<HttpService>(
    HttpService,
  ) as any as MockHttpService;

  return new TestContainer({
    module,
    httpService,
    session,
  });
}
