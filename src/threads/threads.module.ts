import { Module } from '@nestjs/common';
import HttpModule from 'src/http/http.module';
import PostsModule from 'src/posts/posts.module';
import XmlApiModule from 'src/xml-api/xml-api.module';
import ThreadsController from './controllers/threads.controller';
import ThreadsService from './services/threads.service';

@Module({
  imports: [HttpModule, XmlApiModule, PostsModule],
  exports: [ThreadsService],
  providers: [ThreadsService],
  controllers: [ThreadsController],
})
export default class ThreadsModule {}
