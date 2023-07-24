import { ApiProperty } from '@nestjs/swagger';
import { postProperties } from './post.properties';

export class PostQuoteResource {
  @ApiProperty(postProperties.message)
  message: string;
}
