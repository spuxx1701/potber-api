import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BoardCategoriesModule } from './board-categories/board-categories.module';
import { BoardsModule } from './boards/boards.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { EncodingModule } from './encoding/encoding.module';
import { HttpModule } from './http/http.module';
import { PostsModule } from './posts/posts.module';
import { ThreadsModule } from './threads/threads.module';
import { UsersModule } from './users/users.module';

/* istanbul ignore file */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EncodingModule,
    HttpModule,
    AuthModule,
    UsersModule,
    PostsModule,
    ThreadsModule,
    BoardsModule,
    BoardCategoriesModule,
    BookmarksModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
