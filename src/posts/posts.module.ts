import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from 'src/http/http.module';
import { ThreadsModule } from 'src/threads/threads.module';
import { UsersModule } from 'src/users/users.module';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.services';

@Module({
  imports: [
    UsersModule,
    XmlApiModule,
    HttpModule,
    // This circular dependency is unavoidable due to the fact that the XML API
    // does not offer a way to retrieve a post without knowing its thread id.
    forwardRef(() => ThreadsModule),
  ],
  exports: [PostsService],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
