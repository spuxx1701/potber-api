import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
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
import { isDefined, validate, validateOrReject } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import { PostCreateResource } from 'src/posts/resources/post.create.resource';
import { PostLinkResource } from 'src/posts/resources/post.link.resource';
import { PostResource } from 'src/posts/resources/post.resource';
import {
  validationException,
  validationPipe,
} from 'src/validation/validation.pipe';
import { threadsExceptions } from '../config/threads.exceptions';
import { ThreadResource } from '../resources/thread.resource';
import { ThreadsService } from '../services/threads.service';

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
  @ApiOkResponse({
    description: 'The given thread.',
    type: ThreadResource,
  })
  @ApiException(() => [threadsExceptions.missingId, NotFoundException])
  async findOne(
    @Param('id') id: string,
    @Request() request: any,
    @Query('postId') postId?: string,
    @Query('page') page?: number,
  ): Promise<ThreadResource> {
    return this.service.findOne(id, request.user, { postId, page });
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
  @ApiException(() => [threadsExceptions.quoteMustBeBoolean, NotFoundException])
  async findPost(
    @Param('id') id: string,
    @Param('postId') postId: string,
    @Request() request: any,
    @Query('quote') quote?: 'true' | 'false',
  ): Promise<PostResource> {
    if (isDefined(quote) && quote !== 'true' && quote !== 'false')
      throw threadsExceptions.quoteMustBeBoolean;
    return this.service.findPost(id, postId, request.user, {
      quote: quote === 'true' ? true : false,
    });
  }

  @Post(':id/posts')
  @UsePipes(validationPipe)
  @ApiOperation({
    summary: 'Creates a new post in the given thread.',
  })
  @ApiParam({
    name: 'id',
    description: "The thread's id.",
    example: '219311',
    type: String,
  })
  @ApiOkResponse({
    description: 'Some details that lead to the newly created post.',
    type: PostLinkResource,
  })
  @ApiException(() => [validationException])
  createPost(
    @Param('id') id: string,
    @Body() body: PostCreateResource,
    @Request() request: any,
  ): Promise<PostLinkResource> {
    const post = new PostCreateResource({ threadId: id, ...body });
    return this.service.createPost(post, request.user);
  }
}
