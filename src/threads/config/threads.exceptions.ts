import { BadRequestException } from '@nestjs/common';

export const threadsExceptions = {
  updateBookmarkMustBeBoolean: new BadRequestException(
    'updateBookmark must be a boolean.',
  ),
  quoteMustBeBoolean: new BadRequestException('quote must be a boolean.'),
};
