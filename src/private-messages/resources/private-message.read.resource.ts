import { ApiProperty } from '@nestjs/swagger';
import { privateMessageProperties } from './private-message.properties';
import { UserResource } from 'src/users/resources/user.resource';
import { PrivateMessageFolder } from '../types';

export class PrivateMessageReadResource {
  @ApiProperty(privateMessageProperties.id)
  id: string;

  @ApiProperty(privateMessageProperties.title)
  title: string;

  @ApiProperty(privateMessageProperties.date)
  date: string;

  @ApiProperty(privateMessageProperties.folder)
  folder: PrivateMessageFolder;

  @ApiProperty(privateMessageProperties.unread)
  unread?: boolean;

  @ApiProperty(privateMessageProperties.recipient)
  recipient?: UserResource;

  @ApiProperty(privateMessageProperties.sender)
  sender?: UserResource;
}
