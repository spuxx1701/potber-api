import { Module } from '@nestjs/common';
import PostsService from './services/posts.services';

@Module({
  exports: [PostsService],
  providers: [PostsService],
})
export default class PostsModule {}
