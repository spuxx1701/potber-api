import { NotFoundException } from '@nestjs/common';
import { appExceptions } from 'src/config/app.exceptions';

export const usersExceptions = {
  findById: {
    notFound: new NotFoundException(),
    unknown: appExceptions.unknown,
  },
};

export const usernamesExceptions = {
  findMany: {
    validationFailure: appExceptions.validationFailure,
    unknown: appExceptions.unknown,
  },
};
