import { ApiProperty } from '@nestjs/swagger';

export default class JwtResource {
  @ApiProperty({ description: 'The access token.' })
  access_token: string;
}
