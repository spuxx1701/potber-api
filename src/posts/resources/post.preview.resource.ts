import { ApiProperty } from '@nestjs/swagger';
import { UserResource } from 'src/users/resources/user.resource';
import { postProperties } from './post.properties';

export class PostPreviewResource {
  @ApiProperty(postProperties.icon)
  icon?: string;

  @ApiProperty(postProperties.author)
  author: UserResource;

  @ApiProperty(postProperties.date)
  date: Date;

  @ApiProperty(postProperties.threadId)
  threadId: string;

  @ApiProperty(postProperties.boardId)
  boardId: string;
}
