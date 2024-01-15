import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { registerAs } from '@nestjs/config';

export const corsConfig = registerAs(
  'cors',
  (): CorsOptions => ({
    allowedHeaders: ['content-type', 'authorization'],
    origin: (process.env.CORS_ALLOWED_ORIGINS ?? '').split(','),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);

export type CorsConfig = typeof corsConfig;
