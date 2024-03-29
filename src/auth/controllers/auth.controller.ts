import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { validationPipe } from 'src/validation/validation.pipe';
import { authExceptions } from '../config/auth.exceptions';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { JwtResource } from '../resources/jwt.resource';
import { LoginResource } from '../resources/login.resource';
import { SessionResource } from '../resources/session.resource';

@Controller('auth')
@UsePipes(validationPipe)
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Sign into the board.',
    description: `Signs you into the board and returns an response body containing a JWT (https://jwt.io/). To terminate the session,
      simply delete the JWT (e.g. by deleting the cookie that holds it). To authenticate yourself on Swagger UI, copy the access_token
      from the response object, click the 'Authorize' button on the top of the page, parse your token and hit 'Login'. To terminate the session, hit 'Logout'.
      For more information on how to create and maintain a session, refer to the README.      
      
      🔓 Open Access`,
  })
  @ApiOkResponse({
    description: 'Successful login response containing the JWT (access_token).',
    status: 200,
    type: JwtResource,
  })
  @ApiException(() => Object.values(authExceptions.login))
  async login(@Body() loginResource: LoginResource): Promise<JwtResource> {
    return this.service.login(loginResource);
  }

  @Get('session')
  @ApiOperation({
    summary: 'Returns information about the active session.',
    description: `Looks for an 'Authorization' header in the response containing a JWT, decodes the JWT and then returns its content. Will return 401 if the request does not contain a valid JWT.
      
      🔒 Protected`,
  })
  @ApiOkResponse({
    description: 'The session details.',
    type: SessionResource,
  })
  @ApiException(() => Object.values(authExceptions.session))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async session(@Request() request: any): Promise<SessionResource> {
    const session: SessionResource = { ...request.user };
    return session;
  }
}
