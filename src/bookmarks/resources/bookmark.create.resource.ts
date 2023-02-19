import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { bookmarkProperties } from './bookmark.properties';

export class BookmarkCreateResource {
  @ApiProperty(bookmarkProperties.postId)
  @IsNumberString()
  postId: string;

  @ApiProperty(bookmarkProperties.threadId)
  @IsNumberString()
  threadId: string;
}
