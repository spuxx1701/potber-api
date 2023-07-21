import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, Validate } from 'class-validator';
import { IsValidLifetime } from '../validators/lifetime.validator';

export class LoginResource {
  @ApiProperty({
    description: 'Your username.',
    example: 'username',
  })
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiProperty({
    description: 'Your password.',
    example: 'password',
  })
  @IsString()
  @MaxLength(100)
  password: string;

  @ApiProperty({
    description:
      'The session lifetime. Example values are 3600 (one hour), 86400 (one day), 604800 (one month) or 31536000 (one year).',
    examples: [3600, 86400, 604800, 31536000],
    default: 3600,
  })
  @Validate(IsValidLifetime)
  lifetime: number | string;
}
