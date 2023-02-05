import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('potber middleware')
  .setDescription('The potber middleware API documentation.')
  .setVersion(process.env.npm_package_version)
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
    'access-token',
  )
  .build();

export const swaggerOptions: SwaggerUiOptions = {
  persistAuthorization: true,
};
