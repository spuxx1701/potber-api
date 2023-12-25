import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(
      `${req.method} ${req.originalUrl} from ${req.ip} (origin: ${req.header(
        'origin',
      )}).`,
      'Request',
    );
    next();
  }
}
