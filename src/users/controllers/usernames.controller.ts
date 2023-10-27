import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { usernamesExceptions } from '../config/users.exceptions';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import { UsernamesService } from '../services/usernames.service';
import { validationPipe } from 'src/validation/validation.pipe';
import { UsernamesFindManyQuery } from './queries/usernames.find-many.query';

@Controller('usernames')
@UseInterceptors(LoggingInterceptor)
@UsePipes(validationPipe)
@ApiTags('Users')
export class UsernamesController {
  constructor(private readonly service: UsernamesService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns a filterable list of usernames.',
    description: `Returns a list of usernames that start with the given value. Will return a maximum of 20 usernames.`,
  })
  @ApiQuery({
    name: 'startsWith',
    description: 'Return only usernames that start with the given value.',
    example: 'Ameise',
    required: false,
    type: String,
  })
  @ApiOkResponse({
    description: 'The matching list of usernames.',
    type: String,
    isArray: true,
  })
  @ApiException(() => Object.values(usernamesExceptions.findMany))
  async findMany(@Query() query: UsernamesFindManyQuery): Promise<string[]> {
    return this.service.findMany(query.startsWith);
  }
}
