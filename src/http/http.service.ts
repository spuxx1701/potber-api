import { HttpService as NestHttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { EncodingService } from 'src/encoding/encoding.service';

export interface RequestOptions {
  cookie?: string;
  headers?: Record<string, string>;
  decode?: boolean;
}

@Injectable()
export class HttpService {
  constructor(
    private readonly httpService: NestHttpService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Triggers an outgoing GET request.
   * @param url The url.
   * @param options.cookie (optional) The session cookie.
   * @param options.headers (optional) Additional request headers.
   * @param options.decode (optional) Whether the response should be decoded from ISO-8859-15 to UTF-8.
   * @returns The response object.
   */
  async get(url: string, options?: RequestOptions) {
    const { cookie, headers, decode } = { decode: false, ...options };
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
    return response as { data: string; headers: Record<string, string> };
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

  /**
   * Creates a form data payload from the given object.
   * @param data The object that should be used to create the payload.
   * @param options.encode (optional) Whether string values should be encoded.
   * @returns The payload string.
   */
  createFormDataPayload(data: object, options?: { encode?: true }): string {
    let payload = '';
    Object.keys(data).forEach((key, index) => {
      if (index >= 1) payload += '&';
      if (data[key]) {
        if (typeof data[key] === 'string' && options?.encode) {
          payload += `${key}=${this.encodingService.encodeText(data[key])}`;
        } else {
          payload += `${key}=${data[key]}`;
        }
      } else {
        payload += `${key}=`;
      }
    });
    return payload;
  }
}
