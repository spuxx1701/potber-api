import { BadRequestException } from '@nestjs/common';
import { appExceptions } from 'src/config/app.exceptions';

export const bookmarksExceptions = {
  findAll: {
    unauthorized: appExceptions.unauthorized,
    unknown: appExceptions.unknown,
  },
  summary: {
    unauthorized: appExceptions.unauthorized,
    unknown: appExceptions.unknown,
  },
  create: {
    unauthorized: appExceptions.unauthorized,
    unknown: appExceptions.unknown,
    invalidPost: new BadRequestException(['post does not exist']),
  },
  delete: {
    unauthorized: appExceptions.unauthorized,
    unknown: appExceptions.unknown,
  },
};
