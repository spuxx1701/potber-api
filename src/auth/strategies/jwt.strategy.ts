import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { SessionResource } from '../resources/session.resource';
import { authExceptions } from '../auth.exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('AUTH_JWT_SECRET'),
    });
  }

  async validate(payload: SessionResource) {
    // Call the board landing page with the payload's cookie and check whether
    // the user IDs match.
    const session = await this.authService.getSessionDetails(payload.cookie);
    if (session.userId === payload.userId) {
      return payload;
    } else throw authExceptions.invalidSession;
  }
}
