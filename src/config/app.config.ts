import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('application', () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  metricsPort: parseInt(process.env.APP_METRICS_PORT, 10) || 9100,
  clientUrl: process.env.APP_CLIENT_URL ?? 'https://potber.de',
  apiUrl: process.env.APP_API_URL ?? 'https://api.potber.de',
  auth: {
    jwtSecret: process.env,
  },
}));

export type AppConfig = typeof appConfig;
