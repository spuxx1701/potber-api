import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  swaggerConfig,
  swaggerOptions,
  swaggerUri,
} from './config/swagger.config';
import { Logger } from '@nestjs/common';
import { ResponseLoggingInterceptor } from './log/response.logging.interceptor';
import { AppConfig } from './config/app.config';
import { CorsConfig } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<ConfigType<AppConfig>>('application');
  const corsConfig = configService.get<ConfigType<CorsConfig>>('cors');

  // Set up CORS
  Logger.log(
    `CORS enabled. The following origins will be allowed: '${corsConfig.origin}'.`,
    'Bootstrap',
  );
  app.enableCors({
    ...corsConfig,
  });

  // Set up swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerUri, app, document, {
    swaggerOptions,
  });

  app.useGlobalInterceptors(new ResponseLoggingInterceptor());

  const { port } = appConfig;
  await app.listen(port);
  Logger.log(`Application is listening on port ${port}.`, 'Bootstrap');
}
bootstrap();
