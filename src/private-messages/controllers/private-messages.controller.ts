import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
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
import { PrivateMessagesService } from '../services/private-messages.service';
import { PrivateMessageReadResource } from '../resources/private-message.read.resource';
import { PrivateMessageFolder } from '../types';
import { PrivateMessagesFindManyQuery } from './queries/private-messages.find-many.query';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { privateMessagesExceptions } from '../config/private-messages.exceptions';
import { PrivateMessagesMoveToFolderResource } from '../resources/private-message.move-to-folder.resource';
import { validationPipe } from 'src/validation/validation.pipe';
import { PrivateMessageSendResource } from '../resources/private-message.send.resource';

@Controller('privateMessages')
@UsePipes(validationPipe)
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Private messages')
export class PrivateMessagesController {
  constructor(private readonly service: PrivateMessagesService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns a list of private messages.',
    description: `Returns a list of private messages.
    
    🔒 Protected`,
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
  @ApiOkResponse({
    description: 'The list of private messages.',
    type: PrivateMessageReadResource,
    isArray: true,
  })
  @ApiException(() => Object.values(privateMessagesExceptions.findMany))
  async findMany(
    @Request() request: ExpressRequest,
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

  @Get(':id')
  @ApiOperation({
    summary: 'Returns a single private message.',
    description: `Returns a single private message.
    
    🔒 Protected`,
  })
  @ApiParam({
    name: 'id',
    description: "The private message's unique id.",
    type: String,
  })
  @ApiOkResponse({
    description: 'The private message.',
    type: PrivateMessageReadResource,
  })
  @ApiException(() => Object.values(privateMessagesExceptions.findById))
  async findById(@Param('id') id: string, @Request() request: ExpressRequest) {
    return this.service.findById(id, request.user);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates and sends a private message.',
    description: `Creates and sends a private message.
    
    🔒 Protected`,
  })
  @ApiOkResponse({
    description: 'The private message has been sent.',
  })
  @ApiException(() => Object.values(privateMessagesExceptions.send))
  async send(
    @Body() body: PrivateMessageSendResource,
    @Request() request: ExpressRequest,
  ) {
    return this.service.send(body, request.user);
  }

  @Put(':id/markAsUnread')
  @ApiOperation({
    summary: 'Marks a private message as unread.',
    description: `Marks a private message as unread. To mark it as 'read' again, simply call GET '/privateMessages/{id}'.
      
    🔒 Protected`,
  })
  @ApiOkResponse({
    description: 'The private message has been marked as unread.',
  })
  @ApiException(() => Object.values(privateMessagesExceptions.markAsRead))
  async markAsUnread(
    @Param('id') id: string,
    @Request() request: ExpressRequest,
  ) {
    return this.service.markAsUnread(id, request.user);
  }

  @Put(':id/moveToFolder')
  @ApiOperation({
    summary: 'Moves a private message.',
    description: `Moves a private message to the specified folder.
    
    🔒 Protected`,
  })
  @ApiQuery({
    name: 'folder',
    description: 'The target folder.',
    enum: PrivateMessageFolder,
  })
  @ApiOkResponse({
    description: 'The private message has been marked as unread.',
  })
  @ApiException(() => Object.values(privateMessagesExceptions.markAsRead))
  async moveToFolder(
    @Param('id') id: string,
    @Body() body: PrivateMessagesMoveToFolderResource,
    @Request() request: ExpressRequest,
  ) {
    return this.service.moveToFolder(id, body.folder, request.user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a private mssage.',
    description: `Deletes a private mssage.
    
    🔒 Protected`,
  })
  @ApiOkResponse({
    description:
      'The private message has been deleted or did not exist in the first place.',
  })
  @ApiException(() => Object.values(privateMessagesExceptions.delete))
  async delete(@Param('id') id: string, @Request() request: ExpressRequest) {
    return this.service.delete(id, request.user);
  }
}
