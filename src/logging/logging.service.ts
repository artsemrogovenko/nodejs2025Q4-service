import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

loadEnvFile('.env');

const maxFileSize = Number(process.env.MAX_SIZE);

@Injectable()
export class LoggingService implements LoggerService {
  log(message: string) {
    this.writeFile(message, 'log');
  }
  warn(message: string) {
    this.writeFile(message, 'warn');
  }
  debug?(message: string) {
    this.writeFile(message, 'debug');
  }
  verbose?(message: string) {
    this.writeFile(message, 'verbose');
  }
  fatal?(message: string) {
    this.writeFile(message, 'fatal');
  }

  error(message: string) {
    this.writeFile(message, 'error');
  }

  private writeFile(message: string, type: LogLevel) {
    const timestamp = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '');
    const logMessage = `[${timestamp}] [${type}] ${message}\n`;
    const dir = './logs';
    let filename = `${dir}/${type}.log`;

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    if (existsSync(filename)) {
      const stat = statSync(filename);
      if (stat.size > maxFileSize) {
        filename = `${filename}-${timestamp}.log`;
      }
    }

    appendFileSync(filename, logMessage);
  }
}
