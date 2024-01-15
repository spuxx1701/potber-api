import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(
    @InjectMetric('http_requests_total') public counter: Counter<string>,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (!req.originalUrl.startsWith('/metrics')) {
      this.counter.inc();

      Logger.log(
        `${req.method} ${req.originalUrl} from ${req.ip} (origin: ${req.header(
          'origin',
        )}).`,
        'Request',
      );
    }
    next();
  }
}
