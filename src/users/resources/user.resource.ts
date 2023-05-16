import { ApiProperty } from '@nestjs/swagger';

export class UserResource {
  @ApiProperty({
    description: "The user's unique id.",
    example: '1268185',
  })
  id: string;

  @ApiProperty({
    description: "The user's name.",
    example: 'Ameisenfutter',
  })
  name: string;

  @ApiProperty({
    description: "The user's avatar url.",
    example: './avatare/upload/U1268185--small.png',
  })
  avatarUrl?: string;

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
    description:
      "The group id. This probably encodes the user's role, but that's not certain.",
  })
  groupId?: string;
}
