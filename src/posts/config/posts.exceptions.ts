import {
  BadRequestException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

export const postsExceptions = {
  tooManyRequests: new HttpException(
    'Forum has blocked the request due to rate limiting exhaustion.',
    HttpStatus.TOO_MANY_REQUESTS,
  ),
  threadIsClosed: new BadRequestException('Cannot post in a closed thread.'),
  unknown: new InternalServerErrorException(
    'Create or edit request failed due to an unknown reason.',
  ),
};
