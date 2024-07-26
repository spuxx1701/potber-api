import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.getArgByIndex(0);
    if (
      req.originalUrl.startsWith('/metrics') ||
      req.originalUrl.startsWith('/healthz')
    )
      return;
    const dateIn = new Date();
    return next.handle().pipe(
      tap(() => {
        const dateOut = new Date();
        Logger.log(
          `${req.method} ${req.url} fulfilled after ${
            dateOut.getTime() - dateIn.getTime()
          }ms.`,
          'Response',
        );
      }),
    );
  }
}
