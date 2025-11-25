import { IsNumber, IsOptional, IsString } from 'class-validator';
import type { IUser } from 'src/types';

export class User implements IUser {
  @IsString()
  id!: string;
  login!: string;
  @IsOptional()
  password!: string;
  @IsNumber()
  version!: number;
  createdAt!: number;
  updatedAt!: number;
}
