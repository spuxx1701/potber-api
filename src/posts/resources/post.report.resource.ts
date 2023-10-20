import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostReportResource {
  @ApiProperty({
    description:
      'The cause for the report. Users need to specify why they want to report the post.',
  })
  @IsString()
  cause: string;
}
