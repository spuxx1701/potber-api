import { ApiPropertyOptions } from '@nestjs/swagger';

export const bookmarkProperties = {
  id: {
    description: "The bookmark's unique id.",
    example: '123456',
  } as ApiPropertyOptions,

  postId: {
    description: 'The post id the bookmark is currently positioned on.',
    example: '1249813752',
  } as ApiPropertyOptions,

  newPostsCount: {
    description: 'The number of unread posts in the bookmarked thread.',
    example: 42,
  } as ApiPropertyOptions,

  threadId: {
    description: "The bookmarked thread's id.",
    example: '219289',
  } as ApiPropertyOptions,

  thread: {
    description:
      "A short summary of the bookmarked thread. Contains 'id', 'title', 'isClosed' and 'pagesCount' properties.",
    example: {
      id: '219289',
      title: 'potber',
      isClosed: false,
      pagesCount: 11,
    },
  } as ApiPropertyOptions,

  board: {
    description:
      "The board's id and name that the bookmarked thread belongs to.",
    example: {
      id: '14',
      name: 'public Offtopic',
    },
  } as ApiPropertyOptions,
};
