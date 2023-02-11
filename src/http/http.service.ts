import { HttpService as NestHttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface RequestOptions {
  cookie?: string;
  headers?: object;
}

@Injectable()
export class HttpService {
  constructor(private readonly httpService: NestHttpService) {}

  /**
   * Triggers an outgoing GET request.
   * @param url The url.
   * @param options The request options.
   * @returns The response object.
   */
  async get(url: string, options?: RequestOptions) {
    return firstValueFrom(
      this.httpService
        .get(url, {
          headers: {
            Cookie: options?.cookie,
            ...options?.headers,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
  }

  /**
   * Triggers an outgoing POST request.
   * @param url The url.
   * @param payload The payload.
   * @param options The request options.
   * @returns The response object.
   */
  async post(url: string, payload: any, options?: RequestOptions) {
    return firstValueFrom(
      this.httpService
        .post(url, payload, {
          headers: {
            Cookie: options?.cookie,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            ...options?.headers,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
  }
}
