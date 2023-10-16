/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { Global, Injectable, Module } from '@nestjs/common';
import { RequestOptions } from 'https';

/**
 * `MockHttpService` provides a simple API that allows mocking outgoing HTTP requests.
 */
@Injectable()
export class MockHttpService {
  get(url: string, options?: RequestOptions): { data: any } {
    throw new Error('Implement me!');
  }

  post(url: string, payload: any, options?: RequestOptions): { data: any } {
    throw new Error('Implement me!');
  }

  /**
   * Sets a mock response for HttpService.get().
   * @param data The mock data the function should return.
   */
  mockGet(data: any) {
    this.get = jest.fn((url: string, options?: RequestOptions) => {
      return { data };
    });
  }

  /**
   * Sets a mock response for HttpService.post().
   * @param data The mock data the function should return.
   */
  mockPost(data: any) {
    this.post = jest.fn(
      (url: string, payload: any, options?: RequestOptions) => {
        return { data };
      },
    );
  }
}

@Module({
  providers: [
    {
      provide: HttpService,
      useClass: MockHttpService,
    },
  ],
  exports: [HttpService],
})
export class MockHttpModule {}
