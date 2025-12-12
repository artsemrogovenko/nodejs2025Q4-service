import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    throw new Error('Method not implemented.');
  }
}
