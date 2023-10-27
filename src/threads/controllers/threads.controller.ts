import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import { threadsExceptions } from '../config/threads.exceptions';
import { ThreadReadResource } from '../resources/thread.read.resource';
import { ThreadsService } from '../services/threads.service';
import { ThreadCreateResource } from '../resources/thread.create.resource';
import { validationPipe } from 'src/validation/validation.pipe';
import { ThreadsFindByIdQuery } from './queries/threads.find-by-id.query';

@Controller('threads')
@UsePipes(validationPipe)
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiTags('Threads')
@ApiBearerAuth('access-token')
export class ThreadsController {
  constructor(private readonly service: ThreadsService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Gets a thread by id.',
    description: `Gets a thread by id.
    
    🔒 Protected`,
  })
  @ApiParam({
    name: 'id',
    description: "The thread's id.",
    example: '219289',
    type: String,
  })
  @ApiQuery({
    name: 'page',
    description: "The page you'd like to get.",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'postId',
    description:
      'If provided, the page containing this specific post will be returned if possible.',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'page',
    description:
      "The page you'd like to get. Will be ignored if postId is supplied.",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'updateBookmark',
    description:
      'Whether the corresponding bookmark should be updated (if it exists).',
    required: false,
    type: Boolean,
  })
  @ApiOkResponse({
    description: 'The given thread.',
    type: ThreadReadResource,
  })
  @ApiException(() => Object.values(threadsExceptions.findById))
  async findById(
    @Param('id') id: string,
    @Request() request: ExpressRequest,
    @Query() query: ThreadsFindByIdQuery,
  ): Promise<ThreadReadResource> {
    return this.service.findById(id, request.user, {
      ...query,
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new thread.',
    description: `reates a new thread.
    
    🔒 Protected`,
  })
  @ApiOkResponse({
    description: 'The created thread.',
    type: ThreadReadResource,
  })
  @ApiException(() => Object.values(threadsExceptions.create))
  async create(
    @Body() body: ThreadCreateResource,
    @Request() request: ExpressRequest,
  ): Promise<ThreadReadResource> {
    const thread = new ThreadCreateResource({ ...body });
    return this.service.create(thread, request.user);
  }
}
