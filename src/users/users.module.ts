import { Module } from '@nestjs/common';
import { XmlApiModule } from 'src/xml-api/xml-api.module';
import { UsersService } from './services/users.service';

@Module({
  imports: [XmlApiModule],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
