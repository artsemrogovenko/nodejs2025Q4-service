import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  type Type,
} from '@nestjs/common';
import { validate, type ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { APP_PIPE } from '@nestjs/core';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    const reason = errors
      .flatMap((error: ValidationError) =>
        Object.values(error.constraints || {}),
      )
      .join(', ');
    if (errors.length > 0) {
      throw new BadRequestException('Not contain required fields', reason);
    }
    return value;
  }

  private toValidate(metatype: Type): boolean {
    const types: Type[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

export const FieldsValidator = {
  provide: APP_PIPE,
  useClass: ValidationPipe,
};
