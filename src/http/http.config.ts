import { HttpModuleOptions } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { InternalAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

export const httpConfig: HttpModuleOptions = {
  timeout: 30000,
};

export function httpRequestInterceptor(
  config: InternalAxiosRequestConfig<any>,
) {
  Logger.log(`Outgoing request to '${config.url}'.`, 'Axios');
  return config;
}

export const defaultHeaders: Partial<RawAxiosRequestHeaders> = {
  Accept: 'text/html,text/xml',
  'User-Agent': 'potber-api',
};
