import {
  Controller,
  Get,
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
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { BoardCategoryResource } from '../resources/board-category.resource';
import { BoardCategoriesService } from '../services/board-categories.service';
import { boardCategoriesExceptions } from '../config/board-categories.exceptions';

@Controller('boardCategories')
@ApiTags('Boards')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class BoardCategoriesController {
  constructor(private readonly service: BoardCategoriesService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns all board categories that you have access to.',
    description: `Returns all board categories that you have access to. Boards are grouped within board categories, so if you want to get all boards, you need to call this endpoint and then iterate over the categories.
    
    🔒 Protected`,
  })
  @ApiOkResponse({
    description: 'The board categories.',
    type: BoardCategoryResource,
    isArray: true,
  })
  @ApiException(() => Object.values(boardCategoriesExceptions.findAll))
  async findAll(
    @Request() request: ExpressRequest,
  ): Promise<BoardCategoryResource[]> {
    return this.service.findAll(request.user);
  }
}
