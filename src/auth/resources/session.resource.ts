import { ApiProperty } from '@nestjs/swagger';

export default class SessionResource {
  @ApiProperty({
    description: 'Your user ID.',
  })
  userId: string;

  @ApiProperty({
    description: 'Your username.',
  })
  username: string;

  @ApiProperty({
    description: 'Your logout token.',
  })
  logoutToken: string;
}
