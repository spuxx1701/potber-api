import { ApiProperty } from '@nestjs/swagger';

export class UserResource {
  @ApiProperty({
    description: "The user's unique id.",
  })
  id: string;

  @ApiProperty({
    description: "The user's name.",
  })
  name: string;

  @ApiProperty({
    description: "The user's avatar url.",
  })
  avatarUrl?: string;

  @ApiProperty({
    description:
      "When the user has logged in last. Information might be private depending on user's settings.",
  })
  lastLogin?: string;

  @ApiProperty({
    description:
      "The user's activity. Information might be private depending on user's settings.",
  })
  activity?: string;

  @ApiProperty({
    description: "The user's status.",
  })
  status?: string;

  @ApiProperty({
    description:
      "The group id. This probably encodes the user's role, but that's not certain.",
  })
  groupId?: string;
}
