import { BadRequestException } from '@nestjs/common';

export const usersExceptions = {
  findById: {
    invalidId: new BadRequestException('Must provide a valid id.'),
  },
};
