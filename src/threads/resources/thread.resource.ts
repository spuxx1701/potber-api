import { ApiProperty } from '@nestjs/swagger';
import {
  FirstPost,
  LastPost,
  PostResource,
} from 'src/posts/resources/post.resource';

export class ThreadResource {
  @ApiProperty({
    description: "The thread's unique ID.",
  })
  id: string;

  @ApiProperty({
    description: "The thread's title.",
  })
  title: string;

  @ApiProperty({
    description: "The thread's subtitle.",
  })
  subtitle: string;

  @ApiProperty({
    description: 'The number of replies (posts) that thread received.',
  })
  repliesCount: number;

  @ApiProperty({
    description: 'The number of hits that thread received.',
  })
  hitsCount: number;

  @ApiProperty({
    description: 'The number of pages the thread has.',
  })
  pagesCount: number;

  @ApiProperty({
    description: 'Whether the thread has been closed.',
  })
  isClosed: boolean;

  @ApiProperty({
    description: 'Whether the thread is sticky.',
  })
  isSticky: boolean;

  @ApiProperty({
    description: 'Whether the thread is important.',
  })
  isImportant: boolean;

  @ApiProperty({
    description: 'Whether the thread is an announcement.',
  })
  isAnnouncement: boolean;

  @ApiProperty({
    description: 'Whether the thread is global.',
  })
  isGlobal: boolean;

  @ApiProperty({
    description: 'The board the thread belongs to.',
  })
  boardId: string;

  @ApiProperty({
    description: "The thread's opening post.",
  })
  firstPost?: FirstPost;

  @ApiProperty({
    description: "The thread's most recent post.",
  })
  lastPost?: LastPost;

  @ApiProperty({
    description: "The thread's current page.",
  })
  page?: ThreadPage;
}

export interface ThreadPage {
  number: number;
  postCount: number;
  offset: number;
  posts: PostResource[];
}
