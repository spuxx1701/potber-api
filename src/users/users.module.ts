import { Module } from '@nestjs/common';
import { HttpModule } from 'src/http/http.module';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { EncodingModule } from 'src/encoding/encoding.module';

@Module({
  imports: [HttpModule, XmlApiModule, EncodingModule],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
