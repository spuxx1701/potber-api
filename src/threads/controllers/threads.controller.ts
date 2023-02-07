import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Controller,
  Get,
  NotFoundException,
  Post,
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
import { ThreadResource } from '../resources/thread.resource';

@Controller('threads')
@ApiTags('Threads')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class ThreadsController {
  @Get(':id')
  @ApiOperation({ summary: 'Gets a thread by ID.' })
  @ApiOkResponse({
    description: 'The given thread.',
    type: ThreadResource,
  })
  @ApiException(() => [NotFoundException])
  findOne() {
    return 'yolo';
  }
}
