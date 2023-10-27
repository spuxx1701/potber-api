import { BadRequestException, NotFoundException } from '@nestjs/common';
import { appExceptions } from 'src/config/app.exceptions';

export const privateMessagesExceptions = {
  findMany: {
    validationFailure: appExceptions.validationFailure,
    unauthorized: appExceptions.unauthorized,
    unknownError: appExceptions.unknown,
  },
  findById: {
    unauthorized: appExceptions.unauthorized,
    unknownError: appExceptions.unknown,
    notFound: new NotFoundException(),
  },
  replyOrForward: {
    unauthorized: appExceptions.unauthorized,
    unknownError: appExceptions.unknown,
    notFound: new NotFoundException(),
  },
  markAsRead: {
    unauthorized: appExceptions.unauthorized,
    unknownError: appExceptions.unknown,
    notFound: new NotFoundException(),
  },
  moveToFolder: {
    validationFailure: appExceptions.validationFailure,
    unauthorized: appExceptions.unauthorized,
    unknownError: appExceptions.unknown,
    notFound: new NotFoundException(),
  },
  delete: {
    unauthorized: appExceptions.unauthorized,
    unknownError: appExceptions.unknown,
  },
  send: {
    unauthorized: appExceptions.unauthorized,
    unknown: appExceptions.unknown,
    invalidUser: new BadRequestException('Recipient does not exist.'),
  },
};
