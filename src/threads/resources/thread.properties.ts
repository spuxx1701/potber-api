import { ApiOperationOptions, ApiPropertyOptions } from '@nestjs/swagger';

export const threadProperties = {
  id: {
    description: "The thread's unique id.",
    example: '219289',
  } as ApiPropertyOptions,

  title: {
    description: "The thread's title.",
    example: 'potber',
  } as ApiPropertyOptions,

  subtitle: {
    description: "The thread's subtitle.",
    example: 'pot meets ember: Ein mobile-first web client',
  } as ApiPropertyOptions,

  repliesCount: {
    description: 'The number of replies (posts) that thread received.',
    example: 320,
  } as ApiPropertyOptions,

  hitsCount: {
    description: 'The number of hits that thread received.',
    example: 12628,
  } as ApiPropertyOptions,

  pagesCount: {
    description: 'The number of pages the thread has.',
    example: 11,
  } as ApiPropertyOptions,

  isClosed: {
    description: 'Whether the thread has been closed.',
    examaple: false,
  } as ApiPropertyOptions,

  isSticky: {
    description: 'Whether the thread is sticky.',
    example: false,
  } as ApiPropertyOptions,

  isImportant: {
    description: 'Whether the thread is important.',
    example: false,
  } as ApiPropertyOptions,

  isAnnouncement: {
    description: 'Whether the thread is an announcement.',
    example: false,
  } as ApiPropertyOptions,

  isGlobal: {
    description: 'Whether the thread is global.',
    examaple: false,
  } as ApiPropertyOptions,

  boardId: {
    description: 'The board the thread belongs to.',
    example: '14',
  } as ApiPropertyOptions,

  firstPost: {
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
  } as ApiPropertyOptions,

  page: {
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
  } as ApiOperationOptions,
};
