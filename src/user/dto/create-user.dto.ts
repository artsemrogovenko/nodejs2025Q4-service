import type { ICreateUserDto } from 'src/types';

export class CreateUserDto implements ICreateUserDto {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
