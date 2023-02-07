import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Request,
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
    summary: 'Returns the board for the given ID.',
  })
  @ApiOkResponse({
    description: 'The specified board.',
    type: BoardResource,
  })
  @ApiException(() => [NotFoundException, ForbiddenException])
  async findOne(@Param() id: string, @Request() request: any) {
    return this.service.findOne(id, request.user);
  }
}
