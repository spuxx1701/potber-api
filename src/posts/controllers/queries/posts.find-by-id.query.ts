import { IsNumberString } from 'class-validator';

export class PostsFindByIdQuery {
  @IsNumberString()
  threadId: string;
}
