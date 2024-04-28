import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { appExceptions } from 'src/config/app.exceptions';

export const authExceptions = {
  login: {
    validationFailure: appExceptions.validationFailure,
    unknown: appExceptions.unknown,
    wrongCredentials: new UnauthorizedException(
      'Login failed (possibly due to wrong credentials).',
    ),
    lockedPermanently: new ForbiddenException(
      'The account has been locked permanently. potber-api does not support permenently locked accounts logging in.',
    ),
  },
  validate: {
    invalidSession: new UnauthorizedException(
      'Session is invalid or has expired.',
    ),
  },
  session: {
    unauthorized: appExceptions.unauthorized,
    unknown: appExceptions.unknown,
  },
};
