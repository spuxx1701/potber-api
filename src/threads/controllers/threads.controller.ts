import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  UnauthorizedException,
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
import { isBooleanString, isDefined } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import { PostWriteResource } from 'src/posts/resources/post.write.resource';
import { PostLinkResource } from 'src/posts/resources/post.link.resource';
import { PostResource } from 'src/posts/resources/post.resource';
import {
  validationException,
  validationPipe,
} from 'src/validation/validation.pipe';
import { threadsExceptions } from '../config/threads.exceptions';
import { ThreadResource } from '../resources/thread.resource';
import { ThreadsService } from '../services/threads.service';
import * as dotenv from 'dotenv';

dotenv.config();
const testThreadId = process.env.SWAGGER_TEST_THREAD_ID;

@Controller('threads')
@ApiTags('Threads')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class ThreadsController {
  constructor(private readonly service: ThreadsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Gets a thread by id.' })
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
    @Query('updateBookmark') updateBookmark?: boolean,
  ): Promise<ThreadResource> {
    if (isDefined(updateBookmark) && !isBooleanString(updateBookmark))
      throw threadsExceptions.updateBookmarkMustBeBoolean;
    return this.service.findOne(id, request.user, {
      postId,
      page,
      updateBookmark,
    });
  }

  @Get(':id/posts/:postId')
  @ApiOperation({ summary: 'Gets a specific post by its thread and post ids.' })
  @ApiParam({
    name: 'id',
    description: "The thread's id.",
    example: '219289',
    type: String,
  })
  @ApiParam({
    name: 'postId',
    description: "The post's id.",
    example: '1249813752',
    type: String,
  })
  @ApiQuery({
    name: 'quote',
    description:
      "Pass this parameter if you'd like to quote the post. The post content will then be returned with quote tags.",
    required: false,
    type: Boolean,
  })
  @ApiOkResponse({
    description: 'The given post.',
    type: PostResource,
  })
  @ApiException(() => [
    threadsExceptions.quoteMustBeBoolean,
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
  ])
  async findPost(
    @Param('id') id: string,
    @Param('postId') postId: string,
    @Request() request: any,
    @Query('quote') quote?: 'true' | 'false',
  ): Promise<PostResource> {
    if (isDefined(quote) && !isBooleanString(quote))
      throw threadsExceptions.quoteMustBeBoolean;
    return this.service.findPost(id, postId, request.user, {
      quote: quote === 'true' ? true : false,
    });
  }

  // @Post(':id/posts')
  // @UsePipes(validationPipe)
  // @ApiOperation({
  //   summary: 'Creates a new post in the given thread.',
  // })
  // @ApiParam({
  //   name: 'id',
  //   description: "The thread's id.",
  //   example: testThreadId,
  //   type: String,
  // })
  // @ApiOkResponse({
  //   description: 'Some details that lead to the newly created post.',
  //   type: PostLinkResource,
  // })
  // @ApiException(() => [
  //   validationException,
  //   BadRequestException,
  //   UnauthorizedException,
  //   ForbiddenException,
  // ])
  // createPost(
  //   @Param('id') id: string,
  //   @Body() body: PostWriteResource,
  //   @Request() request: any,
  // ): Promise<PostLinkResource> {
  //   const post = new PostWriteResource({ threadId: id, ...body });
  //   return this.service.createPost(post, request.user);
  // }
}
