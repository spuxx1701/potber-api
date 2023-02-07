import {
  HttpModule as NestHttpModule,
  HttpService as NestHttpService,
} from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { httpConfig, httpRequestInterceptor } from './http.config';
import { HttpService } from './http.service';

@Module({
  imports: [NestHttpModule.register(httpConfig)],
  exports: [HttpService],
  providers: [HttpService],
})
export class HttpModule {
  constructor(private readonly httpService: NestHttpService) {}

  onModuleInit() {
    // Attach HTTP service interceptors
    this.httpService.axiosRef.interceptors.request.use(httpRequestInterceptor);
  }
}
