import { HttpModuleOptions } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { InternalAxiosRequestConfig } from 'axios';

export const httpConfig: HttpModuleOptions = {
  timeout: 10000,
};

export function httpRequestInterceptor(
  config: InternalAxiosRequestConfig<any>,
) {
  Logger.log(`Outgoing request to '${config.url}'.`, 'Axios');
  return config;
}
