import { ApiPropertyOptions } from '@nestjs/swagger';

export const boardProperties = {
  id: {
    description: "The board's unique id.",
    example: '14',
  } as ApiPropertyOptions,

  name: {
    description: "The board's name.",
    example: 'Public Offtopic',
  } as ApiPropertyOptions,

  description: {
    description: "The board's description.",
    example: 'für das was nicht passt und sonstige geistige Höhenflüge',
  } as ApiPropertyOptions,

  threadsCount: {
    description: 'How many threads the board has.',
    example: 46604,
  } as ApiPropertyOptions,

  repliesCount: {
    description: 'How many posts the board has.',
    example: 14000842,
  } as ApiPropertyOptions,

  categoryId: {
    description: 'The category this board belongs to.',
    example: '6',
  } as ApiPropertyOptions,

  lastPost: {
    description: "The board's most recent post.",
  } as ApiPropertyOptions,

  page: {
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
  } as ApiPropertyOptions,
};
