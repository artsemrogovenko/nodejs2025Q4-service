import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './store/validation';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as YAML from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const file = readFileSync('./doc/api.yaml', 'utf8');
  const document = YAML.parse(file);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
