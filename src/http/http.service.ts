import { HttpService as NestHttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { SessionResource } from 'src/auth/resources/session.resource';
import { appExceptions } from 'src/config/app.exceptions';
import { EncodingService } from 'src/encoding/encoding.service';
import { defaultHeaders } from './http.config';

export interface RequestOptions {
  cookie?: string;
  headers?: Record<string, string>;
  decode?: boolean;
  encoding?: string;
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
    const response = await firstValueFrom<{ data: ArrayBuffer | string }>(
      this.httpService
        .get(url, {
          responseEncoding: decode ? 'binary' : undefined,
          responseType: decode ? 'arraybuffer' : undefined,
          headers: {
            Cookie: cookie,
            ...defaultHeaders,
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
      const contentTypeHeader: string = (response as any).headers[
        'content-type'
      ];
      const decoding = contentTypeHeader?.split('charset=')[1];
      const decoder = new TextDecoder(decoding?.toLowerCase() ?? 'iso-8859-1');
      const text = decoder.decode(response.data as ArrayBuffer);
      response.data = text;
    }
    // Sessions may get terminated in case a user uses forum's the global 'log out' function.
    // We'll check for any signs that happened and return a 401 so the client can act accordingly.
    if (
      (response.data as string) ===
      '<?xml version="1.0" encoding="utf-8" ?>\n<not-logged-in />'
    )
      throw appExceptions.unauthorized;

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
    const { encoding, cookie, headers } = {
      encoding: 'iso-8859-15',
      ...options,
    };
    return firstValueFrom(
      this.httpService
        .post(url, payload, {
          headers: {
            Cookie: cookie,
            'Content-Type': `application/x-www-form-urlencoded;charset=${encoding}`,
            ...defaultHeaders,
            ...headers,
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
  createFormDataPayload(
    data: object,
    options?: {
      encode?: boolean;
      escapeHtml?: boolean;
      replaceUnsupportedCharacters?: boolean;
    },
  ): string {
    let payload = '';
    Object.keys(data).forEach((key, index) => {
      if (index >= 1) payload += '&';
      if (data[key]) {
        if (typeof data[key] === 'string' && options?.encode) {
          let value = data[key];
          if (options?.replaceUnsupportedCharacters) {
            value = this.encodingService.replaceUnsupportedCharacters(value);
          }
          if (options?.encode) {
            value = this.encodingService.encode(value);
          }
          if (options?.escapeHtml) {
            value = this.encodingService.escapeHtml(value);
          }
          payload += `${key}=${value}`;
        } else {
          payload += `${key}=${data[key]}`;
        }
      } else {
        payload += `${key}=`;
      }
    });
    return payload;
  }

  /**
   * Specific actions (like creating or updating posts) require providing a certain security token. That token
   * can be found in the corresponding HTML forms. Calling this method will scan the document at the given
   * location for a token and return it.
   * @param url The url.
   * @param session The session resource.
   */
  async getSecurityToken(
    url: string,
    session: SessionResource,
  ): Promise<string> {
    const { data } = await this.get(url, {
      cookie: session.cookie,
      decode: true,
    });
    if (data.includes(`Nicht genug Privilegien`)) {
      throw appExceptions.forbidden;
    }
    const tokenMatches = data.match(/(?:(name='token'\svalue=')(.*?)('\s\/>))/);
    if (tokenMatches && tokenMatches.length >= 3) {
      return tokenMatches[2] as string;
    } else {
      throw appExceptions.unableToGetToken;
    }
  }
}
