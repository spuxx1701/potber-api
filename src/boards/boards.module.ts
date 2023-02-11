import { Module } from '@nestjs/common';
import { HttpModule } from 'src/http/http.module';
import { ThreadsModule } from 'src/threads/threads.module';
import { UsersModule } from 'src/users/users.module';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { BoardsController } from './controllers/boards.controller';
import { BoardsService } from './services/boards.service';

@Module({
  imports: [HttpModule, XmlApiModule, ThreadsModule, UsersModule],
  exports: [BoardsService],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
