import { ApiProperty } from '@nestjs/swagger';
import { PRIVILEGED_USER_RANKS } from 'src/config/constants';

export class UserResource {
  @ApiProperty({
    description: "The user's unique id.",
    example: '1268185',
  })
  id: string;

  @ApiProperty({
    description:
      "The user's name. Can be undefined if the user has been deleted.",
    example: 'Ameisenfutter',
  })
  name?: string;

  @ApiProperty({
    description:
      "The user's avatar url. Can be undefined if the user has been deleted.",
    example: './avatare/upload/U1268185--small.png',
  })
  avatarUrl?: string;

  @ApiProperty({
    description: "The user's rank.",
    example: 'Spamkönig',
  })
  rank?: string;

  @ApiProperty({
    description:
      "When the user has logged in last. Information might be private depending on user's settings. Schema is 'dd.mm.yyyy hh:mm' without timezone information. Timezone is always 'Europe/Berlin' (CET or CEST).",
    example: '02.04.2023 13:55',
  })
  lastLogin?: string;

  @ApiProperty({
    description:
      "The user's activity. Information might be private depending on user's settings.",
    example: 'online',
  })
  activity?: string;

  @ApiProperty({
    description: "The user's status.",
    example: 'aktiv',
  })
  status?: string;

  @ApiProperty({
    description: "The age of the user's account.",
    example: '15.10.2007 19:44 (5755 Tage)',
  })
  age?: string;

  @ApiProperty({
    description:
      "The group id. This probably encodes the user's role, but that's not certain.",
  })
  groupId?: string;

  @ApiProperty({
    description:
      'Whether the user account has been locked (temporarily or permanently).',
  })
  locked?: boolean;

  @ApiProperty({
    description: `Whether the user is a privileged user. Users with the following ranks are considered privileged: ${PRIVILEGED_USER_RANKS.join(
      ', ',
    )}`,
  })
  privileged?: boolean;
}
