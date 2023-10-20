import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

export const appExceptions = {
  unauthorized: new UnauthorizedException(),
  unknown: new InternalServerErrorException(),
};
