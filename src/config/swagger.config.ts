import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';

export const swaggerUri = '/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('potber-api')
  .setVersion(process.env.npm_package_version)
  .setDescription(
    `potber-api is a web server that connects to https://forum.mods.de. It's purpose is to provide a functional, modern and RESTful JSON API for clients.`,
  )
  .setContact('Ameisenfutter', 'https://spuxx.dev', 'hi@spuxx.dev')
  .setLicense(
    'GNU licensed',
    'https://github.com/spuxx1701/potber-api/blob/main/LICENSE',
  )
  .setExternalDoc('README', 'https://github.com/spuxx1701/potber-api#readme')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      description: 'Sign in via bearer authentication.',
    },
    'access-token',
  )
  .build();

export const swaggerOptions: SwaggerUiOptions = {
  persistAuthorization: true,
};
