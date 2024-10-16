import { ApiProperty } from '@nestjs/swagger';
import { PRIVILEGED_USER_RANKS } from 'src/config/constants';

export class SessionResource {
  @ApiProperty({
    description: 'Your user id.',
  })
  userId: string;

  @ApiProperty({
    description: 'Your username.',
  })
  username: string;

  @ApiProperty({
    description: "Your active avatar's URL.",
  })
  avatarUrl: string;

  @ApiProperty({
    description: 'Your board session cookie.',
  })
  cookie: string;

  @ApiProperty({
    description: 'When the JWT has been issued.',
  })
  iat: number;

  @ApiProperty({
    description: 'When the JWT will expire.',
  })
  exp: number;

  @ApiProperty({
    description: `Whether the user is a privileged user. Users with the following ranks are considered privileged: ${PRIVILEGED_USER_RANKS.join(
      ', ',
    )}`,
  })
  privileged: boolean;
}
