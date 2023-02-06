import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { httpConfig } from './config/http.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.register(httpConfig),
    AuthModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
