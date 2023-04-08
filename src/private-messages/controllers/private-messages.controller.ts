import {
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import { PrivateMessagesService } from '../services/private-messages.service';
import { PrivateMessageReadResource } from '../resources/private-message.read.resource';

@Controller('privateMessages')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Private messages')
export class PrivateMessagesController {
  constructor(private readonly service: PrivateMessagesService) {}

  @Get('inbound')
  async getInbound(
    @Request() request: any,
  ): Promise<PrivateMessageReadResource[]> {
    return this.service.getInbound(request.user);
  }
}
