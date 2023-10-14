import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { swaggerUri } from './config/swagger.config';

@Controller()
@ApiTags('Root')
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Returns the index document. Contains information about the API.',
    description: `Returns the index document. Contains information about the API.
    
    🔓 Open Access`,
  })
  @ApiOkResponse({
    description: 'The index document.',
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
    description: `Returns the current health of the API. This is mainly used by kubernetes to check the server's status, but you may also use this for the same purpose.
    
    🔓 Open Access`,
  })
  @ApiOkResponse({
    description: 'The server status.',
  })
  health() {
    return {
      status: 'ok',
    };
  }
}
