import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';

export default class LoginResource {
  @ApiProperty({
    description: 'Your username.',
  })
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiProperty({
    description: 'Your password.',
  })
  @IsString()
  @MaxLength(50)
  password: string;

  @ApiProperty({
    description:
      'The session lifetime. Can be 3600 (one hour), 86400 (one day), 604800 (one month) or 31536000 (one year)',
    examples: [3600, 86400, 604800, 31536000],
    default: 3600,
  })
  @IsNumber()
  @Min(3600)
  @Max(31536000)
  lifetime: number;
}
