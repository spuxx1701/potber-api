import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { appExceptions } from 'src/config/app.exceptions';

export const privateMessagesExceptions = {
  findMany: {
    unauthorized: appExceptions.unauthorized,
  },
  findById: {
    unauthorized: appExceptions.unauthorized,
    notFound: new NotFoundException(),
    unknownError: new InternalServerErrorException(
      'Unknown error occured while parsing message.',
    ),
  },
  markAsRead: {
    unauthorized: appExceptions.unauthorized,
    notFound: new NotFoundException(),
  },
  moveToFolder: {
    unauthorized: appExceptions.unauthorized,
    notFound: new NotFoundException(),
  },
  delete: {
    unauthorized: appExceptions.unauthorized,
  },
  send: {
    unauthorized: appExceptions.unauthorized,
    invalidUser: new BadRequestException('Recipient does not exist.'),
    unknown: appExceptions.unknown,
  },
};
