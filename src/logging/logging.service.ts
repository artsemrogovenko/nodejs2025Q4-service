import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import {
  appendFileSync,
  chmodSync,
  existsSync,
  mkdirSync,
  renameSync,
  statSync,
} from 'node:fs';
import { loadEnvFile } from 'node:process';

loadEnvFile('.env');

const maxFileSize = Number(process.env.MAX_SIZE);
const depth = Number(process.env.LOG_LEVELS);

@Injectable()
export class LoggingService implements LoggerService {
  private levelPriority = ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'];
  private activeLevels: string[] = [];

  constructor() {
    this.activeLevels = this.levelPriority.reverse().slice(0, depth);
  }

  private shouldLog(level: LogLevel) {
    return this.activeLevels.includes(level);
  }

  log(message: string) {
    if (this.shouldLog('log')) this.writeFile(message, 'log');
  }
  warn(message: string) {
    if (this.shouldLog('warn')) this.writeFile(message, 'warn');
  }
  debug?(message: string) {
    if (this.shouldLog('debug')) this.writeFile(message, 'debug');
  }
  verbose?(message: string) {
    if (this.shouldLog('verbose')) this.writeFile(message, 'verbose');
  }
  fatal?(message: string) {
    if (this.shouldLog('fatal')) this.writeFile(message, 'fatal');
  }

  error(message: string) {
    if (this.shouldLog('error')) this.writeFile(message, 'error');
  }

  private async writeFile(message: string, type: LogLevel) {
    const timestamp = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '');
    const logMessage = `[${timestamp}] [${type}] ${message}\n`;
    const rootDir = './logs';
    const typedDir = `${rootDir}/${type}`;
    const filename = `${typedDir}/${type}.log`;

    if (!existsSync(rootDir)) {
      mkdirSync(rootDir, { recursive: true });
    }
    chmodSync(rootDir, 0o777);

    if (!existsSync(typedDir)) {
      mkdirSync(typedDir, { recursive: true });
    }
    chmodSync(typedDir, 0o777);

    if (existsSync(filename)) {
      const stat = statSync(filename);
      if (stat.size >= maxFileSize) {
        const archiveName = `${filename}-${timestamp}.log`;
        renameSync(filename, archiveName);
      }
    }

    appendFileSync(filename, logMessage, { encoding: 'utf8' });
    chmodSync(filename, 0o777);
  }
}
