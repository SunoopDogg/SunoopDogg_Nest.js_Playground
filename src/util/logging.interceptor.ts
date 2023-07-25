import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import * as chalk from 'chalk';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const { method, url } = context.switchToHttp().getRequest();

    Logger.verbose(
      `${chalk.cyanBright('<==')} (${method}) ${chalk.cyanBright(
        decodeURIComponent(url),
      )}`,
      context.getClass().name,
    );

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = context.switchToHttp().getResponse();

        const statusColor =
          ['green', 'blueBright'][Math.floor(statusCode / 100) - 2] || 'white';

        Logger.verbose(
          `${chalk.cyan('==>')} (${chalk[statusColor](
            statusCode,
          )}) ${chalk.yellow(`+${Date.now() - now}ms`)}`,
          context.getClass().name,
        );
      }),

      catchError((err) => {
        Logger.verbose(
          `${chalk.redBright('==>')} (${chalk.redBright(
            err?.status || '500',
          )}) ${chalk.yellow(`+${Date.now() - now}ms`)}`,
          context.getClass().name,
        );

        throw err;
      }),
    );
  }
}
