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
import { BoardResource } from '../resources/board.resource';
import { BoardsService } from '../services/boards.service';
import { validationPipe } from 'src/validation/validation.pipe';
import { BoardsFindByIdQuery } from './queries/boards.find-by-id.query';
import { boardsExceptions } from '../config/boards.exceptions';

@Controller('boards')
@UsePipes(validationPipe)
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiTags('Boards')
@ApiBearerAuth('access-token')
export class BoardsController {
  constructor(private readonly service: BoardsService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Gets a board by id.',
    description: `Gets a board by id.
    
    🔒 Protected`,
  })
  @ApiParam({
    name: 'id',
    description: "The board's id.",
    example: '14',
    type: String,
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
  @ApiException(() => Object.values(boardsExceptions.findById))
  async findById(
    @Param('id') id: string,
    @Request() request: any,
    @Query() query: BoardsFindByIdQuery,
  ): Promise<BoardResource> {
    return this.service.findById(id, request.user, query.page);
  }
}
