import { randomUUID } from 'crypto';
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
