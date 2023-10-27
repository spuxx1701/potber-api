import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Trim } from 'src/utility/transformers/trim.transformer';

export class PostReportResource {
  @ApiProperty({
    description:
      'The cause for the report. Users need to specify why they want to report the post.',
  })
  @IsString()
  @Trim()
  @MinLength(1)
  @MaxLength(1000)
  cause: string;
}
