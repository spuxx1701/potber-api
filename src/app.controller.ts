import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swaggerUri } from './config/swagger.config';

@Controller()
@ApiTags('Root')
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Returns the index document. Contains information about the API.',
  })
  index() {
    return {
      title: 'potber-api',
      description: 'A RESTful API for forum.mods.de',
      author: {
        name: 'Leopold Hock',
        website: 'https://www.spuxx.dev',
        github: 'https://www.github.com/spuxx1701',
      },
      github: 'https://www.github.com/spuxx1701/potber-api',
      client: process.env.APP_CLIENT_URL,
      documentation: `${process.env.APP_API_URL}${swaggerUri}`,
      documentationJson: `${process.env.APP_API_URL}${swaggerUri}-json`,
      status: {
        health: `${process.env.APP_API_URL}/healthz`,
      },
    };
  }

  @Get('healthz')
  @ApiOperation({
    summary: 'Returns the current health of the API.',
  })
  health() {
    return {
      status: 'ok',
    };
  }
}
