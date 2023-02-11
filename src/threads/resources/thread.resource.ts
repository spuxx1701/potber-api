import { ApiProperty } from '@nestjs/swagger';
import { PostPreviewResource } from 'src/posts/resources/post.preview.resource';
import { ThreadPageResource } from './thread-page.resource';
import { threadProperties } from './thread.properties';

export class ThreadResource {
  @ApiProperty(threadProperties.id)
  id: string;

  @ApiProperty(threadProperties.title)
  title: string;

  @ApiProperty(threadProperties.subtitle)
  subtitle: string;

  @ApiProperty(threadProperties.repliesCount)
  repliesCount: number;

  @ApiProperty(threadProperties.hitsCount)
  hitsCount: number;

  @ApiProperty(threadProperties.pagesCount)
  pagesCount: number;

  @ApiProperty(threadProperties.isClosed)
  isClosed: boolean;

  @ApiProperty(threadProperties.isSticky)
  isSticky: boolean;

  @ApiProperty(threadProperties.isImportant)
  isImportant: boolean;

  @ApiProperty(threadProperties.isAnnouncement)
  isAnnouncement: boolean;

  @ApiProperty(threadProperties.isGlobal)
  isGlobal: boolean;

  @ApiProperty(threadProperties.boardId)
  boardId: string;

  @ApiProperty(threadProperties.firstPost)
  firstPost?: PostPreviewResource;

  // The last post is not being handed out when the 'threads.php' endpoint is called directly.
  lastPost?: PostPreviewResource;

  @ApiProperty(threadProperties.page)
  page?: ThreadPageResource;
}
