import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { PrivateMessageFolder } from 'src/private-messages/types';
import { TransformBooleanString } from 'src/utility/transformers/boolean-string.transformer';

export class PrivateMessagesFindManyQuery {
  @IsEnum(PrivateMessageFolder)
  @IsOptional()
  folder?: PrivateMessageFolder;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  unread?: boolean;
}
