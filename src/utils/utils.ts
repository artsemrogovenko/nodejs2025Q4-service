import { HttpException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { validate as uuidValidate } from 'uuid';

export function getIndex(array: Array<unknown>, id: string) {
  return array.indexOf(id);
}

export function uuid() {
  return randomUUID();
}

export function isValidUuid(id: string) {
  return uuidValidate(id);
}

export function timestamp() {
  return Date.now();
}

export const MyNotFound = (id: string, storename: string) => {
  throw new HttpException(
    {
      message: `${id} not exist in ${storename}s`,
      error: 'Not found',
    },
    StatusCodes.NOT_FOUND,
  );
};
