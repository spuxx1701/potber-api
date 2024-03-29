import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { swaggerUri } from './config/swagger.config';

@Controller()
@ApiTags('Root')
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Returns the root document. Contains information about the API.',
    description: `Returns the root document. Contains information about the API.
    
    🔓 Open Access`,
  })
  @ApiOkResponse({
    description: 'The root document.',
  })
  root() {
    return {
      title: 'potber-api',
      description: 'A RESTful JSON API for the website https://forum.mods.de',
      author: {
        name: 'Ameisenfutter',
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
    description: `Returns the current health of the API. This is mainly used by kubernetes to check the server's status, but it can  also be used by clients to do the same.
    
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
