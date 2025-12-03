import { IsNumber, IsUUID } from 'class-validator';
import type { IUser } from 'src/types';
import { Entity } from 'typeorm';

@Entity()
export class User implements IUser {
  @IsUUID()
  id!: string;
  login!: string;
  password!: string;
  @IsNumber()
  version!: number;
  createdAt!: number;
  updatedAt!: number;
}
