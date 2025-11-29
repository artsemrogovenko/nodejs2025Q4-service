import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './store/validation';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as YAML from 'yaml';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const file = readFileSync('./doc/api.yaml', 'utf8');
  const document = YAML.parse(file);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
