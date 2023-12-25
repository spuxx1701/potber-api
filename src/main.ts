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
import { ResponseLoggingInterceptor } from './log/response.logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Set up CORS
  const origin = configService.get<string>('CORS_ALLOWED_ORIGINS').split(',');
  Logger.log(
    `CORS enabled. The following origins will be allowed: '${origin.join(
      "', '",
    )}'.`,
    'NestApplication',
  );
  app.enableCors({
    origin,
    ...corsConfig,
  });

  // Set up swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerUri, app, document, {
    swaggerOptions,
  });

  app.useGlobalInterceptors(new ResponseLoggingInterceptor());

  const port = configService.get<number>('APP_PORT');
  await app.listen(port);
  Logger.log(`Application is listening on port ${port}.`, 'NestApplication');
}
bootstrap();
