import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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
    notFound: new NotFoundException(),
  },
};
