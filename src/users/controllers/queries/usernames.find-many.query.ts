import { IsOptional, IsString } from 'class-validator';

export class UsernamesFindManyQuery {
  @IsString()
  @IsOptional()
  startsWith: string;
}
