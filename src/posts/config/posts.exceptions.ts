import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { appExceptions } from 'src/config/app.exceptions';

export const postsExceptions = {
  findById: {
    validationFailure: appExceptions.validationFailure,
    unauthorized: appExceptions.unauthorized,
    forbidden: appExceptions.forbidden,
    unknown: appExceptions.unknown,
    notfound: new NotFoundException(),
  },
  create: {
    unauthorized: appExceptions.unauthorized,
    validationFailure: appExceptions.validationFailure,
    unknown: appExceptions.unknown,
    tooManyRequests: appExceptions.tooManyRequests,
    threadIsClosed: new ForbiddenException('Cannot post in a closed thread.'),
    threadIsHidden: new ForbiddenException('Cannot post in a hidden thread.'),
  },
  update: {
    validationFailure: appExceptions.validationFailure,
    unauthorized: appExceptions.unauthorized,
    unknown: appExceptions.unknown,
    tooManyRequests: appExceptions.tooManyRequests,
    threadIsClosed: new ForbiddenException('Cannot post in a closed thread.'),
    threadIsHidden: new ForbiddenException('Cannot post in a hidden thread.'),
    notfound: new NotFoundException(),
  },
  quote: {
    validationFailure: appExceptions.validationFailure,
    unauthorized: appExceptions.unauthorized,
    forbidden: appExceptions.forbidden,
    unknown: appExceptions.unknown,
    notFound: new NotFoundException(),
  },
  report: {
    validationFailure: appExceptions.validationFailure,
    unauthorized: appExceptions.unauthorized,
    forbidden: appExceptions.forbidden,
    unknown: appExceptions.unknown,
    notFound: new NotFoundException(),
    alreadyReported: new ConflictException(
      'This post has already been reported.',
    ),
  },
};
