import { ApiProperty } from '@nestjs/swagger';
import { PostPreviewResource } from 'src/posts/resources/post.preview.resource';
import { ThreadPageResource } from './thread-page.resource';
import { threadProperties } from './thread.properties';

export class ThreadReadResource {
  @ApiProperty({ description: "The thread's unique id.", example: '219289' })
  id: string;

  @ApiProperty({
    description: "The thread's title.",
    example: 'potber',
  })
  title: string;

  @ApiProperty({
    description: "The thread's subtitle.",
    example: 'pot meets ember: Ein mobile-first web client',
  })
  subtitle: string;

  @ApiProperty({
    description: 'The number of replies (posts) that thread received.',
    example: 320,
  })
  repliesCount: number;

  @ApiProperty({
    description: 'The number of hits that thread received.',
    example: 12628,
  })
  hitsCount: number;

  @ApiProperty({
    description: 'The number of pages the thread has.',
    example: 11,
  })
  pagesCount: number;

  @ApiProperty({
    description: 'Whether the thread has been closed.',
    example: false,
  })
  isClosed: boolean;

  @ApiProperty({
    description: 'Whether the thread is sticky.',
    example: false,
  })
  isSticky: boolean;

  @ApiProperty({
    description: 'Whether the thread is important.',
    example: false,
  })
  isImportant: boolean;

  @ApiProperty({
    description: 'Whether the thread is an announcement.',
    example: false,
  })
  isAnnouncement: boolean;

  @ApiProperty({
    description: 'Whether the thread is global.',
    example: false,
  })
  isGlobal: boolean;

  @ApiProperty({
    description: 'The board the thread belongs to.',
    example: '14',
  })
  boardId: string;

  @ApiProperty({
    description: "The thread's opening post.",
    example: {
      author: {
        id: '1268185',
        name: 'Ameisenfutter',
      },
      date: '2023-01-14T21:44:01.000Z',
      icon: '37',
      threadId: '219289',
      boardId: '14',
    },
  })
  firstPost?: PostPreviewResource;

  // The last post is not being handed out when the 'threads.php' endpoint is called directly.
  @ApiProperty({
    description: "The thread's most recent post.",
    example: {
      author: {
        id: '1268185',
        name: 'Ameisenfutter',
      },
      date: '2023-01-14T21:44:01.000Z',
      threadId: '219289',
      boardId: '14',
    },
  })
  lastPost?: PostPreviewResource;

  @ApiProperty({
    description: "The thread's current page.",
    example: {
      number: 1,
      offset: 0,
      postCount: 30,
      posts: [
        {
          id: '1249813752',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-14T21:44:01.000Z',
          title: 'pot meets ember: Ein mobile-first web client',
          icon: '37',
          message: '...',
          editedCount: 25,
          lastEdit: {
            user: {
              id: '1268185',
              name: 'Ameisenfutter',
            },
            date: '2023-02-08T20:04:18.000Z',
          },
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
        },
      ],
    },
  })
  page?: ThreadPageResource;
}
