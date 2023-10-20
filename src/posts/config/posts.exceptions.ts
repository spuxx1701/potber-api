import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { appExceptions } from 'src/config/app.exceptions';
import { validationException } from 'src/validation/validation.pipe';

export const postsExceptions = {
  invalidThreadId: new BadRequestException('Must provide a valid thread id.'),
  tooManyRequests: new HttpException(
    'Forum has blocked the request due to rate limiting exhaustion.',
    HttpStatus.TOO_MANY_REQUESTS,
  ),
  threadIsClosed: new ForbiddenException('Cannot post in a closed thread.'),
  threadIsHidden: new ForbiddenException('Cannot post in a hidden thread.'),
  unknown: new InternalServerErrorException(
    'Create or edit request failed due to an unknown reason.',
  ),
  quote: {
    unauthorized: appExceptions.unauthorized,
    validationFailed: validationException,
    notFound: new NotFoundException(),
    unknown: appExceptions.unknown,
  },
  report: {
    unauthorized: appExceptions.unauthorized,
    validationFailed: validationException,
    notFound: new NotFoundException(),
    alreadyReported: new ConflictException(
      'This post has already been reported.',
    ),
    unknown: appExceptions.unknown,
  },
};
