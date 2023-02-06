import {
  Controller,
  Get,
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
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import BoardCategoryResource from '../resources/board-category.resource';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import BoardCategoriesService from '../services/board-categories.service';

@Controller('boardCategories')
@ApiTags('Board categories')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class BoardCategoriesController {
  constructor(private readonly service: BoardCategoriesService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns all board categories that you have access to.',
  })
  @ApiOkResponse({
    description: 'The board categories.',
    type: BoardCategoryResource,
    isArray: true,
  })
  @ApiException(() => [UnauthorizedException])
  async findAll(@Request() request: any): Promise<BoardCategoryResource[]> {
    return this.service.findAll(request.user);
  }
}
