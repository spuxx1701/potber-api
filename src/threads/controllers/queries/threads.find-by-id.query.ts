import {
  IsBoolean,
  IsNumber,
  IsNumberString,
  IsOptional,
  Min,
} from 'class-validator';
import { TransformBooleanString } from 'src/utility/transformers/boolean-string.transformer';

export class ThreadsFindByIdQuery {
  @IsNumberString()
  @IsOptional()
  postId?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  updateBookmark: boolean;
}
