import { Module } from '@nestjs/common';
import { PrivateMessagesService } from './services/private-messages.service';
import { PrivateMessagesController } from './controllers/private-messages.controller';
import { HttpModule } from 'src/http/http.module';
import { EncodingModule } from 'src/encoding/encoding.module';

@Module({
  imports: [HttpModule, EncodingModule],
  providers: [PrivateMessagesService],
  controllers: [PrivateMessagesController],
})
export class PrivateMessagesModule {}
