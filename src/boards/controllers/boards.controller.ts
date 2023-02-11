import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Controller,
  ForbiddenException,
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
import { boardsExceptions } from '../config/boards.exceptions';
import { BoardResource } from '../resources/board.resource';
import { BoardsService } from '../services/boards.service';

@Controller('boards')
@ApiTags('Boards')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class BoardsController {
  constructor(private readonly service: BoardsService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Gets a board by id.',
  })
  @ApiQuery({
    name: 'page',
    description: "The page you'd like to get.",
    required: false,
    type: Number,
  })
  @ApiOkResponse({
    description: 'The specified board.',
    type: BoardResource,
  })
  @ApiException(() => [
    boardsExceptions.missingId,
    NotFoundException,
    ForbiddenException,
  ])
  async findOne(
    @Param('id') id: string,
    @Request() request: any,
    @Query('page') page?: number,
  ): Promise<BoardResource> {
    if (!id) throw boardsExceptions.missingId;
    return this.service.findOne(id, request.user, page);
  }
}
