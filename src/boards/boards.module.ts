import { Module } from '@nestjs/common';
import HttpModule from 'src/http/http.module';
import XmlApiModule from 'src/xml-api/xml-api.module';
import { BoardCategoriesController } from './controllers/board-categories.controller';
import BoardCategoriesService from './services/board-categories.service';
import BoardsService from './services/boards.service';

@Module({
  imports: [HttpModule, XmlApiModule],
  controllers: [BoardCategoriesController],
  providers: [BoardCategoriesService, BoardsService],
})
export class BoardsModule {}
