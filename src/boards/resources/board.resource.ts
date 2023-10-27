import { ApiProperty } from '@nestjs/swagger';
import { PostPreviewResource } from 'src/posts/resources/post.preview.resource';
import { ThreadReadResource } from 'src/threads/resources/thread.read.resource';
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
  threads: ThreadReadResource[];
}

export class BoardResource {
  @ApiProperty({ description: "The board's unique id.", example: '14' })
  id: string;

  @ApiProperty({
    description: "The board's name.",
    example: 'Public Offtopic',
  })
  name: string;

  @ApiProperty({
    description: "The board's description.",
    example: 'für das was nicht passt und sonstige geistige Höhenflüge',
  })
  description: string;

  @ApiProperty({
    description: 'How many threads the board has.',
    example: 46604,
  })
  threadsCount: number;

  @ApiProperty({
    description: 'How many posts the board has.',
    example: 14000842,
  })
  repliesCount: number;

  @ApiProperty({
    description: 'The category this board belongs to.',
    example: '6',
  })
  categoryId: string;

  @ApiProperty({
    description: "The board's most recent post.",
  })
  lastPost?: PostPreviewResource;

  // Not being handed out by the API when the 'boards.php' endpoint is called directly.
  moderators?: UserResource[];

  @ApiProperty({
    description: 'A single page of the board.',
    example: {
      number: 1,
      stickiesCount: 1,
      globalsCount: 1,
      threadsCount: 30,
      threads: [
        {
          id: '211035',
          title: 'Neue Forensatzung',
          subtitle: 'vom 23.05.2019',
          repliesCount: 0,
          hitsCount: 996468,
          pagesCount: 1,
          isClosed: true,
          isSticky: true,
          isImportant: true,
          isAnnouncement: true,
          isGlobal: true,
          boardId: '14',
          firstPost: {
            author: {
              id: '18237',
              name: 'krang',
            },
            date: '2013-06-25T21:35:00.000Z',
            icon: '39',
            threadId: '211035',
            boardId: '14',
          },
        },
        {
          id: '36283',
          title: 'Die Regeln des Public Off-Topic & Sammelthreadliste',
          subtitle: 'die Regeln sind einzuhalten!',
          repliesCount: 0,
          hitsCount: 413915,
          pagesCount: 1,
          isClosed: true,
          isSticky: false,
          isImportant: true,
          isAnnouncement: true,
          isGlobal: false,
          boardId: '14',
          firstPost: {
            author: {
              id: '32460',
              name: 'dX',
            },
            date: '2004-01-06T10:59:44.000Z',
            threadId: '36283',
            boardId: '14',
          },
          lastPost: {
            author: {
              id: '21088',
              name: 'Che Guevara',
            },
            date: '2019-10-16T06:29:43.000Z',
            threadId: '36283',
            boardId: '14',
          },
        },
      ],
    },
  })
  page?: BoardPageResource;
}
