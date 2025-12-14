import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { body, baseUrl, method } = req;
    const { statusCode, send } = res;

    let responseBody: object;

    res.send = function (body: any): Response {
      responseBody = body;
      return send.call(this, body);
    };

    res.on('finish', () => {
      const queryString = JSON.stringify(baseUrl);
      const bodyString = JSON.stringify(body);
      this.loggingService.log(
        `${method} ${queryString} Body:${bodyString} - RESPONSE: ${responseBody} STATUSCODE [${statusCode}]`,
      );
    });
    next();
  }
}
