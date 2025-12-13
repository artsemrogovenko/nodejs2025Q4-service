import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './store/validation';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as YAML from 'yaml';
import { loadEnvFile } from 'node:process';
import { LoggingService } from './logging/logging.service';
import { CustomExceptionFilter } from './logging/filter';

loadEnvFile('.env');

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const file = readFileSync('./doc/api.yaml', 'utf8');
  const document = YAML.parse(file);
  SwaggerModule.setup('doc', app, document);

  const logger = app.get(LoggingService);
  app.useLogger(logger);
  app.useGlobalFilters(new CustomExceptionFilter(logger));

  process.on('unhandledRejection', (reason) => {
    logger.error(`[unhandledRejection] ${reason}`);
  });
  process.on('uncaughtException', (err) => {
    logger.error(`[uncaughtException] ${err.message}`);
  });

  await app.listen(PORT);
}

bootstrap();
