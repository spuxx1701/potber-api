import { Module } from '@nestjs/common';
import UsersService from './services/users.service';

@Module({
  exports: [UsersService],
  providers: [UsersService],
})
export default class UsersModule {}
