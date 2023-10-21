import { BadRequestException, NotFoundException } from '@nestjs/common';
import { appExceptions } from 'src/config/app.exceptions';

export const usersExceptions = {
  findById: {
    notFound: new NotFoundException(),
    invalidId: new BadRequestException('Must provide a valid id.'),
    unknown: appExceptions.unknown,
  },
};

export const usernamesExceptions = {
  findMany: {
    unknown: appExceptions.unknown,
  },
};
