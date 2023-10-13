import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const privateMessagesExceptions = {
  findMany: {
    unauthorized: new UnauthorizedException(),
  },
  findById: {
    unauthorized: new UnauthorizedException(),
    notFound: new NotFoundException(),
    unknownError: new InternalServerErrorException(
      'Unknown error occured while parsing message.',
    ),
  },
  markAsRead: {
    unauthorized: new UnauthorizedException(),
    notFound: new NotFoundException(),
  },
  moveToFolder: {
    unauthorized: new UnauthorizedException(),
    notFound: new NotFoundException(),
  },
};
