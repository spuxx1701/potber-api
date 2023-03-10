import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
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
import { isDefined, isNumberString, isBooleanString } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import {
  validationException,
  validationPipe,
} from 'src/validation/validation.pipe';
import { postsExceptions } from '../config/posts.exceptions';
import { PostLinkResource } from '../resources/post.link.resource';
import { PostResource } from '../resources/post.resource';
import { PostWriteResource } from '../resources/post.write.resource';
import { PostsService } from '../services/posts.services';

@Controller('posts')
@ApiTags('Posts')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Gets a specific post by its thread and post ids.' })
  @ApiParam({
    name: 'id',
    description: "The post's id.",
    example: '1249813752',
    type: String,
  })
  @ApiQuery({
    name: 'threadId',
    description: "The thread's id the post belongs to.",
    required: true,
    example: '219289',
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
    postsExceptions.quoteMustBeBoolean,
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
  ])
  async findOne(
    @Param('id') id: string,
    @Request() request: any,
    @Query('threadId') threadId: string,
    @Query('quote') quote?: 'true' | 'false',
  ): Promise<PostResource> {
    if (!isNumberString(threadId)) {
      throw postsExceptions.invalidThreadId;
    }
    if (isDefined(quote) && !isBooleanString(quote))
      throw postsExceptions.quoteMustBeBoolean;
    return this.service.findOne(id, threadId, request.user, {
      quote: quote === 'true' ? true : false,
    });
  }

  @Post()
  @UsePipes(validationPipe)
  @ApiOperation({
    summary: 'Creates a new post.',
  })
  @ApiOkResponse({
    description: 'Some details that lead to the newly created post.',
    type: PostLinkResource,
  })
  @ApiException(() => [
    validationException,
    UnauthorizedException,
    ForbiddenException,
  ])
  create(
    @Body() body: PostWriteResource,
    @Request() request: any,
  ): Promise<PostResource> {
    const post = new PostWriteResource({ ...body });
    return this.service.create(post, request.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a post.' })
  @ApiParam({
    name: 'id',
    description: "The post's id.",
    example: '1249813752',
    type: String,
  })
  @ApiOkResponse({
    description: 'Some details that lead to the newly created post.',
    type: PostLinkResource,
  })
  @ApiException(() => [
    validationException,
    UnauthorizedException,
    ForbiddenException,
  ])
  async update(
    @Param('id') id: string,
    @Body() body: PostWriteResource,
    @Request() request: any,
  ) {
    return this.service.update(id, new PostWriteResource(body), request.user);
  }
}
