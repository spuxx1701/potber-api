import { ApiProperty } from '@nestjs/swagger';

export class SessionResource {
  @ApiProperty({
    description: 'Your user ID.',
  })
  userId: string;

  @ApiProperty({
    description: 'Your username.',
  })
  username: string;

  @ApiProperty({
    description: 'Your board session cookie.',
  })
  cookie: string;

  @ApiProperty({
    description: 'When the JWT has been issued.',
  })
  iat?: number;

  @ApiProperty({
    description: 'When the JWT will expire.',
  })
  exp?: number;
}
