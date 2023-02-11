import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
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
  @ApiQuery({
    name: 'page',
    description: "The page you'd like to get.",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    description: "The page you'd like to get.",
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
    @Query('page') page?: number,
  ): Promise<ThreadResource> {
    if (!id) throw threadsExceptions.missingId;
    return this.service.findOne(id, request.user, page);
  }
}
