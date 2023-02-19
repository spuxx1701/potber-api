import { ApiProperty } from '@nestjs/swagger';
import { postProperties } from './post.properties';

export class PostLinkResource {
  @ApiProperty(postProperties.id)
  id: string;

  @ApiProperty(postProperties.threadId)
  threadId: string;

  @ApiProperty(postProperties.url)
  url: string;
}
