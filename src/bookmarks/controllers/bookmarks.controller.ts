import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import { validationException } from 'src/validation/validation.pipe';
import { bookmarksExceptions } from '../config/bookmarks.exceptions';
import { BookmarkCreateResource } from '../resources/bookmark.create.resource';
import { BookmarkResource } from '../resources/bookmark.resource';
import { BookmarksSummaryResource } from '../resources/bookmarks-summary.resource';
import { BookmarksService } from '../services/bookmarks.service';

@Controller('bookmarks')
@ApiTags('Bookmarks')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class BookmarksController {
  constructor(private readonly service: BookmarksService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns all your bookmarks.',
    description: `Returns all your bookmarks.
    
    🔒 Protected`,
  })
  @ApiOkResponse({
    description: 'The bookmarks array',
    type: BookmarkResource,
    isArray: true,
  })
  @ApiException(() => [UnauthorizedException])
  async findMany(@Request() request: any): Promise<BookmarkResource[]> {
    return this.service.getBookmarks(request.user);
  }

  @Get('summary')
  @ApiOperation({
    summary: 'Returns the bookmarks summary.',
    description: `Returns the bookmarks summary. Contains slightly more information than the pure bookmarks list.
      
    🔒 Protected`,
  })
  @ApiOkResponse({
    description: 'The bookmarks summary.',
    type: BookmarksSummaryResource,
    isArray: true,
  })
  @ApiException(() => [UnauthorizedException])
  async getSummary(@Request() request: any): Promise<BookmarksSummaryResource> {
    return this.service.getSummary(request.user);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new bookmark.',
    description: `Creates a new bookmark. You must provide both the post id and thread id.
    
    🔒 Protected`,
  })
  @ApiOkResponse({
    description: 'The bookmark was created.',
    type: BookmarkResource,
  })
  @ApiException(() => [
    validationException,
    bookmarksExceptions.invalidPostId,
    UnauthorizedException,
  ])
  async create(@Body() body: BookmarkCreateResource, @Request() request: any) {
    return this.service.create(body, request.user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes the given bookmark.',
    description: `Deletes the given bookmark.
    
    🔒 Protected`,
  })
  @ApiOkResponse({
    description: 'The bookmark was deleted.',
  })
  @ApiException(() => [UnauthorizedException, NotFoundException])
  async delete(
    @Param('id') id: string,
    @Request() request: any,
  ): Promise<void> {
    return this.service.delete(id, request.user);
  }
}
