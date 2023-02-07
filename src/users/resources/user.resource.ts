import { ApiProperty } from '@nestjs/swagger';

export default class UserResource {
  @ApiProperty({
    description: "The user's unique ID.",
  })
  id: string;

  @ApiProperty({
    description:
      "The group id. This probably encodes the user's role, but that's not certain.",
  })
  groupId?: string;

  @ApiProperty({
    description: "The user's name.",
  })
  name: string;
}
