import { BadRequestException, NotFoundException } from '@nestjs/common';

export const usersExceptions = {
  findById: {
    notFound: new NotFoundException(),
    invalidId: new BadRequestException('Must provide a valid id.'),
  },
};
