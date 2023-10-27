import { ApiOperationOptions, ApiPropertyOptions } from '@nestjs/swagger';

export const threadProperties = {
  repliesCount: {} as ApiPropertyOptions,

  hitsCount: {} as ApiPropertyOptions,

  pagesCount: {} as ApiPropertyOptions,

  isClosed: {} as ApiPropertyOptions,

  isSticky: {} as ApiPropertyOptions,

  isImportant: {} as ApiPropertyOptions,

  isAnnouncement: {} as ApiPropertyOptions,

  isGlobal: {} as ApiPropertyOptions,

  boardId: {} as ApiPropertyOptions,

  firstPost: {} as ApiPropertyOptions,

  page: {} as ApiOperationOptions,
};
