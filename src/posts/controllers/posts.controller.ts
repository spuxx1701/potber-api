import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
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
import { validationPipe } from 'src/validation/validation.pipe';
import { postsExceptions } from '../config/posts.exceptions';
import { PostReadResource } from '../resources/post.read.resource';
import { PostWriteResource } from '../resources/post.write.resource';
import { PostsService } from '../services/posts.services';
import { PostQuoteResource } from '../resources/post.quote.resource';
import { PostReportResource } from '../resources/post.report.resource';
import { PostsFindByIdQuery } from './queries/posts.find-by-id.query';

@Controller('posts')
@UsePipes(validationPipe)
@UseGuards(JwtAuthGuard)
@ApiTags('Posts')
@ApiBearerAuth('access-token')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Gets a specific post by its thread and post ids.',
    description: `Gets a specific post by its thread and post ids. The thead id is required since the forum unfortunately offers no way of retrieving a post without it.
    
    🔒 Protected`,
  })
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
  @ApiOkResponse({
    description: 'The post.',
    type: PostReadResource,
  })
  @ApiException(() => Object.values(postsExceptions.findById))
  async findById(
    @Param('id') id: string,
    @Request() request: any,
    @Query() query: PostsFindByIdQuery,
  ): Promise<PostReadResource> {
    return this.service.findById(id, query.threadId, request.user);
  }

  @Get(':id/quote')
  @ApiOperation({
    summary: 'Quote a specific post.',
    description: `Quote a specific post. Will return the message of the specific post in qutoe tags.
    
    🔒 Protected`,
  })
  @ApiParam({
    name: 'id',
    description: "The post's id.",
    example: '1249813752',
    type: String,
  })
  @ApiOkResponse({
    description: "The quoted post's message in quote tags.",
    type: PostQuoteResource,
  })
  @ApiException(() => Object.values(postsExceptions.quote))
  async quote(
    @Param('id') id: string,
    @Request() request: any,
  ): Promise<PostQuoteResource> {
    return this.service.quote(id, request.user);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new post.',
    description: `Creates a new post.
    
    🔒 Protected`,
  })
  @ApiOkResponse({
    description: 'Some details that lead to the newly created post.',
    type: PostReadResource,
  })
  @ApiException(() => Object.values(postsExceptions.create))
  create(
    @Body() body: PostWriteResource,
    @Request() request: any,
  ): Promise<PostReadResource> {
    const post = new PostWriteResource({ ...body });
    return this.service.create(post, request.user);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates a post.',
    description: `Updates a post.
    
    🔒 Protected`,
  })
  @ApiParam({
    name: 'id',
    description: "The post's id.",
    example: '1249813752',
    type: String,
  })
  @ApiOkResponse({
    description: 'Some details that lead to the newly created post.',
    type: PostReadResource,
  })
  @ApiException(() => Object.values(postsExceptions.update))
  async update(
    @Param('id') id: string,
    @Body() body: PostWriteResource,
    @Request() request: any,
  ) {
    return this.service.update(id, new PostWriteResource(body), request.user);
  }

  @Post(':id/report')
  @ApiOperation({
    summary: 'Reports a post.',
    description: `Reports a post. The report will be received by the corresponding board's moderators.
    
    🔒 Protected`,
  })
  @ApiParam({
    name: 'id',
    description: "The post's id.",
    type: String,
  })
  @ApiOkResponse({
    description: 'The post has been reported successfully.',
  })
  @ApiException(() => Object.values(postsExceptions.report))
  async report(
    @Param('id') id: string,
    @Body() body: PostReportResource,
    @Request() request: any,
  ) {
    return this.service.report(id, body.cause, request.user);
  }
}
