import { ApiProperty } from '@nestjs/swagger';
import { BookmarkResource } from './bookmark.resource';
import { bookmarksSummaryProperties } from './bookmarks-summary.properties';

export class BookmarksSummaryResource {
  @ApiProperty(bookmarksSummaryProperties.userId)
  userId: string;

  @ApiProperty(bookmarksSummaryProperties.count)
  count: number;

  @ApiProperty(bookmarksSummaryProperties.newPostsCount)
  newPostsCount: number;

  @ApiProperty(bookmarksSummaryProperties.bookmarks)
  bookmarks: BookmarkResource[];
}
