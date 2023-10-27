import { ApiProperty } from '@nestjs/swagger';
import { PostReadResource } from 'src/posts/resources/post.read.resource';

export class ThreadPageResource {
  @ApiProperty({ description: "The thread's current page." })
  number: number;

  @ApiProperty({ description: 'The total number of posts on this page.' })
  postCount: number;

  @ApiProperty({ description: 'I honestly have no idea what this does.' })
  offset: number;

  @ApiProperty({ description: 'The posts on tuis page.' })
  posts: PostReadResource[];
}
