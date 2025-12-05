import {
  Injectable,
  type NestInterceptor,
  type ExecutionContext,
  type CallHandler,
  HttpException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { map, type Observable } from 'rxjs';

@Injectable()
export class UserResponseModifer implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((data) => this.transformData(data)));
  }

  private transformData(data: any) {
    if (Array.isArray(data)) {
      return data.map((item) => {
        const noPassword = this.excludePassword(item);
        return this.convertTime(noPassword);
      });
    }
    const noPassword = this.excludePassword(data);
    return this.convertTime(noPassword);
  }

  private excludePassword(data: any) {
    if (typeof data === 'object' && 'password' in data) {
      const clone = Object.assign({}, data);
      delete clone.password;
      return clone;
    }
    return data;
  }
  private convertTime(data: object) {
    if ('createdAt' in data && 'updatedAt' in data) {
      const clone = Object.assign({}, data);
      clone.createdAt = Number(data.createdAt);
      clone.updatedAt = Number(data.updatedAt);
      return clone;
    }
    return data;
  }
}

@Injectable()
export class FavoritesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'boolean') {
          if (data) {
            if (request.method === 'DELETE') {
              response.status(StatusCodes.NO_CONTENT);
            }
            return {
              message: 'Success',
            };
          } else {
            const id = request.params.id;
            const storeName: string = request.originalUrl
              .replace(`favs`, '')
              .replace(`${id}`, '')
              .replaceAll('/', '')
              .toUpperCase();

            throw new HttpException(
              {
                message: `${id} not exist in ${storeName}`,
                error: 'Unprocessable Entity',
              },
              StatusCodes.UNPROCESSABLE_ENTITY,
            );
          }
        }
        return data;
      }),
    );
  }
}

@Injectable()
export class BaseServiceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (data) {
          if (request.method === 'DELETE') {
            response.status(StatusCodes.NO_CONTENT);
          }
          if (typeof data === 'object') return data;
          return {
            message: 'Success',
          };
        } else {
          const id = request.params.id;
          const storeName: string = request.originalUrl
            .replace(`${id}`, '')
            .replaceAll('/', '')
            .toUpperCase();

          throw new HttpException(
            {
              message: `${request.params.id} not exist in ${storeName}`,
              error: 'Not found',
            },
            StatusCodes.NOT_FOUND,
          );
        }
      }),
    );
  }
}
