import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { LoggingService } from 'src/logging/logging.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggingService) {}

  catch(exception: any, host: ArgumentsHost) {
    throw new Error('Method not implemented.');
  }
}
