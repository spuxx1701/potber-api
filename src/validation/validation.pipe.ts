import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  transform: true,
});

export const validationException = new BadRequestException();
