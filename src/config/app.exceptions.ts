import {
  BadRequestException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

export const appExceptions = {
  validationFailure: new BadRequestException([
    'This array contains reasons for why input validation has failed.',
  ]),
  unauthorized: new UnauthorizedException(),
  unknown: new InternalServerErrorException(),
  unableToGetToken: new InternalServerErrorException(
    'Unable to retrieve security token.',
  ),
  tooManyRequests: new HttpException(
    'Rate limiting has been exhausted.',
    HttpStatus.TOO_MANY_REQUESTS,
  ),
};
