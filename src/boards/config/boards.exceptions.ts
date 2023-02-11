import { BadRequestException } from '@nestjs/common';

export const boardsExceptions = {
  missingId: new BadRequestException('You must provide a board id.'),
};
