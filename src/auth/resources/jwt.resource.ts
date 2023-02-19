import { ApiProperty } from '@nestjs/swagger';

export class JwtResource {
  @ApiProperty({ description: 'The access token.' })
  access_token: string;
}
