import { IsNumber, IsOptional, Min } from 'class-validator';

export class BoardsFindByIdQuery {
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;
}
