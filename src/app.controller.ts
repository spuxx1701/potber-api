import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Index')
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Returns the index document. Contains information about the API.',
  })
  index() {
    return {
      title: 'potber API',
      description: 'A RESTful API for forum.mods.de',
      author: {
        name: 'Leopold Hock',
        website: 'https://www.leopoldhock.de',
        github: 'https://www.github.com/spuxx1701',
      },
      github: 'https://www.github.com/spuxx1701/potber-api',
      client: process.env.APP_CLIENT_URL,
      documentation: process.env.APP_SWAGGER_URL,
    };
  }
}
