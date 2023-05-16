import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { corsConfig } from './config/cors.config';
import {
  swaggerConfig,
  swaggerOptions,
  swaggerUri,
} from './config/swagger.config';
import { Logger } from '@nestjs/common';

/* istanbul ignore file */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Set up CORS
  const origin = configService.get<string>('CORS_ALLOWED_ORIGINS').split(',');
  app.enableCors({
    origin,
    ...corsConfig,
  });

  // Set up swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerUri, app, document, {
    swaggerOptions,
  });

  const port = configService.get<number>('APP_PORT');
  await app.listen(port);
  Logger.log(`Application is listening on port ${port}.`, 'NestApplication');
}
bootstrap();
