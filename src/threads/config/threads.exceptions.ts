import { BadRequestException } from '@nestjs/common';
import { appExceptions } from 'src/config/app.exceptions';

export const threadsExceptions = {
  updateBookmarkMustBeBoolean: new BadRequestException(
    'updateBookmark must be a boolean.',
  ),
  create: {
    validationFailure: appExceptions.validationFailure,
    unauthorized: appExceptions.unauthorized,
    unableToGetToken: appExceptions.unableToGetToken,
    unknown: appExceptions.unknown,
    tooManyRequests: appExceptions.tooManyRequests,
  },
};
