import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  methods: '*',
  origin: '*',
  credentials: true,
};
