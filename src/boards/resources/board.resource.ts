import { ApiProperty } from '@nestjs/swagger';
import { PostPreviewResource } from 'src/posts/resources/post.preview.resource';
import { ThreadReadResource } from 'src/threads/resources/thread.read.resource';
import { UserResource } from 'src/users/resources/user.resource';
import { boardProperties } from './board.properties';

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
  threads: ThreadReadResource[];
}

export class BoardResource {
  @ApiProperty(boardProperties.id)
  id: string;

  @ApiProperty(boardProperties.name)
  name: string;

  @ApiProperty(boardProperties.description)
  description: string;

  @ApiProperty(boardProperties.threadsCount)
  threadsCount: number;

  @ApiProperty(boardProperties.repliesCount)
  repliesCount: number;

  @ApiProperty(boardProperties.categoryId)
  categoryId: string;

  @ApiProperty(boardProperties.lastPost)
  lastPost?: PostPreviewResource;

  // Not being handed out by the API when the 'boards.php' endpoint is called directly.
  moderators?: UserResource[];

  @ApiProperty(boardProperties.page)
  page?: BoardPageResource;
}
