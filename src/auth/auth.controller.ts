import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { validationPipe } from 'src/validation/validation.pipe';
import { authExceptions } from './auth.exceptions';
import AuthService from './auth.service';
import LoginResource from './resources/login.resource';
import SessionResource from './resources/session.resource';

@Controller()
@ApiTags('Authentication')
@UsePipes(validationPipe)
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve information about the current session.' })
  session(): string {
    return 'yolo';
  }

  @Post()
  @ApiOperation({ summary: 'Sign into the forum.' })
  @ApiOkResponse({
    description: 'Login was successful.',
    type: SessionResource,
  })
  @ApiException(() => [
    authExceptions.wrongCredentials,
    authExceptions.unknownLoginFailure,
  ])
  async login(@Body() loginResource: LoginResource): Promise<SessionResource> {
    return this.service.login(loginResource);
  }
}
