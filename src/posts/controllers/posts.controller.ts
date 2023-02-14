import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  ForbiddenException,
  Param,
  Post,
  Put,
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
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import {
  validationException,
  validationPipe,
} from 'src/validation/validation.pipe';
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
