import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import * as chalk from 'chalk';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const method = context.switchToHttp().getRequest<Request>().method;
    const url = decodeURIComponent(context.switchToHttp().getRequest().url);

    let color = 'white';
    switch (method) {
      case 'GET':
        color = 'blue';
        break;
      case 'POST':
        color = 'green';
        break;
      case 'PUT':
        color = 'magenta';
        break;
      case 'DELETE':
        color = 'red';
        break;
    }
    Logger.log(
      chalk.yellow('<== ') + chalk[color](`{ ${url} , ${method} }`),
      'LoggingInterceptor',
    );

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = context.switchToHttp().getResponse<Response>();
        const ms = Date.now() - now;
        Logger.log(
          chalk.yellow('==> ') +
            chalk[color](`{ ${url} , ${method} , ${statusCode} }`) +
            chalk.yellow(` +${ms}ms`),
          'LoggingInterceptor',
        );
      }),
      catchError((err) => {
        const { statusCode } = context.switchToHttp().getResponse<Response>();
        const ms = Date.now() - now;
        Logger.error(
          chalk.red('==> ') +
            chalk[color](`{ ${url} , ${method} , ${statusCode} }`) +
            chalk.red(` +${ms}ms`),
          err.stack,
          'LoggingInterceptor',
        );
        throw err;
      }),
    );
  }
}
