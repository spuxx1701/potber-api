import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BoardCategoriesModule } from './board-categories/board-categories.module';
import { BoardsModule } from './boards/boards.module';
import { HttpModule } from './http/http.module';
import { PostsModule } from './posts/posts.module';
import { ThreadsModule } from './threads/threads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    AuthModule,
    UsersModule,
    PostsModule,
    ThreadsModule,
    BoardsModule,
    BoardCategoriesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
