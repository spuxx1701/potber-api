import { ApiProperty } from '@nestjs/swagger';
import { PostPreviewResource } from 'src/posts/resources/post.preview.resource';
import { ThreadResource } from 'src/threads/resources/thread.resource';
import { UserResource } from 'src/users/resources/user.resource';

export class BoardPageResource {
  @ApiProperty({ description: "The page's number." })
  number: number;

  @ApiProperty({ description: 'The number of sticky threads on that page.' })
  stickiesCount: number;

  @ApiProperty({ description: 'The number of global threads on that page.' })
  globalsCount: number;

  @ApiProperty({ description: 'The total number of hreads on that page.' })
  threadsCount: number;

  @ApiProperty({ description: 'The threads.' })
  threads: ThreadResource[];
}

export class BoardResource {
  @ApiProperty({ description: "The board's unique id." })
  id: string;

  @ApiProperty({ description: "The board's name." })
  name: string;

  @ApiProperty({ description: "The board's description." })
  description: string;

  @ApiProperty({ description: 'How many threads the board has.' })
  threadsCount: number;

  @ApiProperty({ description: 'How many posts the board has.' })
  repliesCount: number;

  @ApiProperty({ description: 'The category this board belongs to.' })
  categoryId: string;

  @ApiProperty({ description: "The board's most recent post." })
  lastPost?: PostPreviewResource;

  @ApiProperty({ description: "Who's the sheriff in town." })
  moderators?: UserResource[];

  @ApiProperty({ description: 'A single page of the board.' })
  page?: BoardPageResource;
}
