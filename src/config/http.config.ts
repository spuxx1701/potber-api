import { HttpModuleOptions } from '@nestjs/axios';

export const httpConfig: HttpModuleOptions = {
  timeout: 5000,
};
