import { ApiProperty } from '@nestjs/swagger';
import { UserResource } from 'src/users/resources/user.resource';
import { postProperties } from './post.properties';

export class PostResource {
  @ApiProperty(postProperties.id)
  id: string;

  @ApiProperty(postProperties.author)
  author: UserResource;

  @ApiProperty(postProperties.date)
  date: Date;

  @ApiProperty(postProperties.threadId)
  threadId: string;

  @ApiProperty(postProperties.boardId)
  boardId: string;

  @ApiProperty(postProperties.title)
  title?: string;

  @ApiProperty(postProperties.icon)
  icon?: string;

  @ApiProperty(postProperties.message)
  message?: string;

  @ApiProperty(postProperties.contentHidden)
  contentHidden?: boolean;

  @ApiProperty(postProperties.editedCount)
  editedCount: number;

  @ApiProperty(postProperties.lastEdit)
  lastEdit?: {
    user: UserResource;
    date: Date;
  };

  @ApiProperty(postProperties.avatarUrl)
  avatarUrl?: string;
}
