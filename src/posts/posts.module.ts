import { Module } from '@nestjs/common';
import UsersModule from 'src/users/users.module';
import XmlApiModule from 'src/xml-api/xml-api.module';
import PostsService from './services/posts.services';

@Module({
  imports: [UsersModule, XmlApiModule],
  exports: [PostsService],
  providers: [PostsService],
})
export default class PostsModule {}
