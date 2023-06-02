import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from 'src/http/http.module';
import { PostsModule } from 'src/posts/posts.module';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { ThreadsController } from './controllers/threads.controller';
import { ThreadsService } from './services/threads.service';
import { EncodingModule } from 'src/encoding/encoding.module';

@Module({
  imports: [
    HttpModule,
    XmlApiModule,
    EncodingModule,
    // This circular dependency is unavoidable due to the fact that the XML API
    // does not offer a way to retrieve a post without knowing its thread id.
    forwardRef(() => PostsModule),
  ],
  exports: [ThreadsService],
  providers: [ThreadsService],
  controllers: [ThreadsController],
})
export class ThreadsModule {}
