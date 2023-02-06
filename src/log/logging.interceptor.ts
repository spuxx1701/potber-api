import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.getArgByIndex(0);
    const dateIn = new Date();
    Logger.log(
      'Incoming request. ' +
        `URL: ${request.url}, Method: ${request.method}, ` +
        `from: ${request.ip}.`,
      this.constructor.name,
    );
    return next.handle().pipe(
      tap(() => {
        const dateOut = new Date();
        Logger.log(
          `Request fulfilled after ${dateOut.getTime() - dateIn.getTime()}ms.`,
          this.constructor.name,
        );
      }),
    );
  }
}
