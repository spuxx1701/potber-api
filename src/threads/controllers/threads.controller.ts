import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { isBooleanString, isDefined } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import { threadsExceptions } from '../config/threads.exceptions';
import { ThreadResource } from '../resources/thread.resource';
import { ThreadsService } from '../services/threads.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Controller('threads')
@ApiTags('Threads')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
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
    type: ThreadResource,
  })
  @ApiException(() => [
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
  ])
  async findOne(
    @Param('id') id: string,
    @Request() request: any,
    @Query('postId') postId?: string,
    @Query('page') page?: number,
    @Query('updateBookmark') updateBookmark?: string,
  ): Promise<ThreadResource> {
    if (isDefined(updateBookmark) && !isBooleanString(updateBookmark))
      throw threadsExceptions.updateBookmarkMustBeBoolean;
    return this.service.findOne(id, request.user, {
      postId,
      page,
      updateBookmark: updateBookmark === 'true',
    });
  }
}
