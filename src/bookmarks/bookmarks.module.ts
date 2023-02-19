import { Module } from '@nestjs/common';
import { HttpModule } from 'src/http/http.module';
import { ThreadsModule } from 'src/threads/threads.module';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { BookmarksController } from './controllers/bookmarks.controller';
import { BookmarksService } from './services/bookmarks.service';

@Module({
  imports: [HttpModule, XmlApiModule, ThreadsModule],
  providers: [BookmarksService],
  controllers: [BookmarksController],
})
export class BookmarksModule {}
