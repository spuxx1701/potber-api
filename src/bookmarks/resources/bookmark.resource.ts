import { ApiProperty } from '@nestjs/swagger';
import { bookmarkProperties } from './bookmark.properties';

export class BookmarkResource {
  @ApiProperty(bookmarkProperties.id)
  id: string;

  @ApiProperty(bookmarkProperties.postId)
  postId: string;

  @ApiProperty(bookmarkProperties.newPostsCount)
  newPostsCount: number;

  @ApiProperty(bookmarkProperties.thread)
  thread: {
    id: string;
    title: string;
    isClosed: boolean;
    pagesCount: number;
  };

  @ApiProperty(bookmarkProperties.board)
  board: {
    id: string;
    name: string;
  };

  removeToken: string;
}
