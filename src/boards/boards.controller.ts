import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class BoardsController {
  @Get()
  @ApiTags('Boards')
  getBoardCategories(): string {
    return 'yolo';
  }
}
