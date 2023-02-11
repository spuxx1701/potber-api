import { Module } from '@nestjs/common';
import { HttpModule } from 'src/http/http.module';
import { UsersModule } from 'src/users/users.module';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.services';

@Module({
  imports: [UsersModule, XmlApiModule, HttpModule],
  exports: [PostsService],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
