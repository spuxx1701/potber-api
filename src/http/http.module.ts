import { HttpModule as NestHttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { httpConfig, httpRequestInterceptor } from './http.config';

@Module({
  imports: [NestHttpModule.register(httpConfig)],
  exports: [NestHttpModule],
})
export default class HttpModule {
  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    // Attach HTTP service interceptors
    this.httpService.axiosRef.interceptors.request.use(httpRequestInterceptor);
  }
}
