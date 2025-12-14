import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggingService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let resultMessage = '';
    let stack = '';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        resultMessage = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        message = (exceptionResponse as any).message || exception.message;
        resultMessage = exception.message;
      } else {
        resultMessage = exception.message;
      }

      stack = exception.stack;

      if (status >= 500) {
        this.logger.error(
          `HTTP Error ${status} - ${resultMessage} ` +
            JSON.stringify({
              path: request.url,
              method: request.method,
              body: request.body,
              query: request.query,
              params: request.params,
              stack: stack,
            }),
        );
      } else {
        this.logger.warn(
          `HTTP Error ${status} - ${resultMessage} ` +
            JSON.stringify({
              path: request.url,
              method: request.method,
            }),
        );
      }
    } else {
      status = response.statusCode;
      if (exception instanceof Error) {
        resultMessage = exception.message;
        stack = exception.stack;
      } else {
        resultMessage = String(exception);
      }

      this.logger.error(
        `Unexpected error - ${resultMessage}` +
          JSON.stringify({
            path: request.url,
            method: request.method,
            body: request.body,
            query: request.query,
            params: request.params,
            stack: stack,
            exception: exception,
          }),
      );
    }
    response.status(status).json({
      statusCode: status,
      path: request.url,
      method: request.method,
      message: message,
    });
  }
}
