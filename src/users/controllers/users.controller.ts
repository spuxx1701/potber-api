import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { usersExceptions } from '../config/users.exceptions';
import { UserResource } from '../resources/user.resource';
import { UsersService } from '../services/users.service';
import { LoggingInterceptor } from 'src/log/logging.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
@ApiTags('Users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get(':id')
  @ApiOperation({
    summary: "Returns a user's profile.",
    description: '🔓 Does not require authentication.',
  })
  @ApiParam({
    name: 'id',
    description: "The user's id.",
    example: '1268185',
    type: String,
  })
  @ApiOkResponse({
    description: 'The user.',
    type: UserResource,
  })
  @ApiException(() => Object.values(usersExceptions.findById))
  async findById(@Param('id') id: string): Promise<UserResource> {
    return this.service.findById(id);
  }
}
