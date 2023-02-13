import { ApiPropertyOptions } from '@nestjs/swagger';
import { BookmarkResource } from './bookmark.resource';

export const bookmarksSummaryProperties = {
  userId: {
    description: 'The unique id of the user to whom the bookmarks belong to.',
    example: '1268185',
  } as ApiPropertyOptions,

  count: {
    description: 'The total number of bookmarks.',
    example: 42,
  } as ApiPropertyOptions,

  newPostsCount: {
    description: 'The total number of unread posts across all bookmarks.',
  } as ApiPropertyOptions,

  bookmarks: {
    description: 'The bookmarks.',
    example: [
      {
        id: '123456',
        postId: '1249813752',
        newPostsCount: 42,
        thread: {
          id: '219289',
          title: 'potber',
          isClosed: false,
          pagesCount: 11,
        },
        board: {
          id: '14',
          name: 'public Offtopic',
        },
        removeToken: '1234',
      },
    ] as BookmarkResource[],
  } as ApiPropertyOptions,
};
