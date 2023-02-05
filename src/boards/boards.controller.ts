import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class BoardsController {
  constructor() {}

  @Get()
  @ApiTags('Boards')
  getBoardCategories(): string {
    return 'yolo';
  }
}
