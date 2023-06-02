import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export const privateMessagesExceptions = {
  findMany: {
    unauthorized: new UnauthorizedException(),
  },
  findById: {
    unauthorized: new UnauthorizedException(),
    notFound: new NotFoundException(),
    unknownError: new Error('Unknown error occured while parsing message.'),
  },
};
