import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SessionResource } from '../resources/session.resource';
import { authExceptions } from '../config/auth.exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('AUTH_JWT_SECRET'),
    });
  }

  validate = validateSession;
}

export const validateSession = (payload: SessionResource) => {
  // We can't really validate the session without noticable performance loss due to subsequent HTTP requests and
  // validation will be handled by the board itself to begin with. All we'll do here is validating whether
  // the session contains required properties.
  if (payload.userId && payload.cookie && Date.now() <= payload.exp * 1000)
    return payload;
  else throw authExceptions.invalidSession;
};
