import { HttpService as NestHttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface RequestOptions {
  cookie?: string;
  headers?: object;
  decode?: boolean;
}

@Injectable()
export class HttpService {
  constructor(private readonly httpService: NestHttpService) {}

  /**
   * Triggers an outgoing GET request.
   * @param url The url.
   * @param options.cookie (optional) The session cookie.
   * @param options.headers (optional) Additional request headers.
   * @param options.decode (optional) Whether the response should be decoded from ISO-8859-15 to UTF-8.
   * @returns The response object.
   */
  async get(url: string, options?: RequestOptions) {
    const { cookie, headers, decode } = { decode: true, ...options };
    const response = await firstValueFrom(
      this.httpService
        .get(url, {
          responseEncoding: decode ? 'binary' : undefined,
          responseType: decode ? 'arraybuffer' : undefined,
          headers: {
            Cookie: cookie,
            ...headers,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
    if (decode) {
      const decoder = new TextDecoder('iso-8859-15');
      const text = decoder.decode(response.data);
      response.data = text;
    }
    return response;
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
