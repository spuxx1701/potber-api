import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  Post,
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
  ApiTags,
} from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/log/logging.interceptor';
import { validationPipe } from 'src/validation/validation.pipe';
import { authExceptions } from './auth.exceptions';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtResource } from './resources/jwt.resource';
import { LoginResource } from './resources/login.resource';
import { SessionResource } from './resources/session.resource';

@Controller('auth')
@ApiTags('Authentication')
@UsePipes(validationPipe)
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Sign into the board.',
    description: `Signs you into the board and returns an 'Authorization' header containing a JWT (https://jwt.io/). To terminate the session,
      simply delete the JWT (e.g. by deleting the cookie that holds it). To authenticate yourself on swagger UI, copy the access_token
      from the response object, click the 'Authorize' button on the top of the page, parse your token and hit 'Login'.
      To terminate the session, hit 'Logout'.`,
  })
  @ApiOkResponse({
    description: 'Login was successful.',
    status: 200,
    type: JwtResource,
  })
  @ApiException(() => [
    authExceptions.wrongCredentials,
    authExceptions.unknownLoginFailure,
  ])
  async login(@Body() loginResource: LoginResource): Promise<JwtResource> {
    return this.service.login(loginResource);
  }

  @Get('session')
  @ApiOperation({
    summary: 'Returns information about the active session.',
    description:
      'Decodes the JWT and returns its content. Will return 401 if the request does not contain a valid JWT.',
  })
  @ApiOkResponse({
    description: 'The session details.',
    type: SessionResource,
  })
  @ApiException(() => UnauthorizedException)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async session(@Request() request: any): Promise<SessionResource> {
    return this.service.getSessionDetails(request.user.cookie);
  }
}
