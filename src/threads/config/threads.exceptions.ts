import { BadRequestException } from '@nestjs/common';

export const threadsExceptions = {
  missingId: new BadRequestException('You must provide a thread id.'),
  quoteMustBeBoolean: new BadRequestException('Quote must be a boolean.'),
};
