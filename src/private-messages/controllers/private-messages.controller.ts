import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import { PrivateMessagesService } from '../services/private-messages.service';
import { PrivateMessageReadResource } from '../resources/private-message.read.resource';
import { PrivateMessageFolder } from '../types';
import { PrivateMessagesFindManyQuery } from './queries/private-messages.find-many.query';

@Controller('privateMessages')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Private messages')
export class PrivateMessagesController {
  constructor(private readonly service: PrivateMessagesService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns private messages.',
  })
  @ApiQuery({
    name: 'folder',
    description:
      'The private message folder. If provided, will only return private messages within that folder. If not provided, will return all private messages.',
    enum: PrivateMessageFolder,
    required: false,
  })
  @ApiQuery({
    name: 'unread',
    description:
      "Filter for the 'unread' property. If not provided, will return both unread and read messages. Only affects messages from the 'inbound' folder.",
    type: Boolean,
    required: false,
  })
  async findMany(
    @Request() request: any,
    @Query(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    query: PrivateMessagesFindManyQuery,
  ): Promise<PrivateMessageReadResource[]> {
    return this.service.findMany(request.user, {
      folder: query?.folder,
      unread: query?.unread,
    });
  }
}
