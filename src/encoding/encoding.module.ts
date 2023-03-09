import { Module } from '@nestjs/common';
import { EncodingService } from './encoding.service';

@Module({
  providers: [EncodingService],
  exports: [EncodingService],
})
export class EncodingModule {}
