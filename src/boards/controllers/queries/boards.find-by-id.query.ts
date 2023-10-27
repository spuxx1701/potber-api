import { IsNumber, IsOptional } from 'class-validator';

export class BoardsFindByIdQuery {
  @IsNumber()
  @IsOptional()
  page?: number;
}
