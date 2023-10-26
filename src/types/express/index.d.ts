import { SessionResource } from 'src/auth/resources/session.resource';

declare module 'express-serve-static-core' {
  namespace Express {
    export interface Request {
      user: SessionResource;
    }
  }
}
