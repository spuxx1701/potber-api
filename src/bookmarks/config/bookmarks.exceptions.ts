import { BadRequestException } from '@nestjs/common';

export const bookmarksExceptions = {
  invalidPostId: new BadRequestException(
    'Cannot set a bookmark on an invalid or already bookmarked post.',
  ),
};
