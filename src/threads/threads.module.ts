import { Module } from '@nestjs/common';
import ThreadsService from './services/threads.service';

@Module({
  exports: [ThreadsService],
  providers: [ThreadsService],
})
export default class ThreadsModule {}
