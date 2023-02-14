import { BadRequestException } from '@nestjs/common';

export const threadsExceptions = {
  updateBookmarkMustBeBoolean: new BadRequestException(
    'updateBookmark must be a boolean.',
  ),
};
