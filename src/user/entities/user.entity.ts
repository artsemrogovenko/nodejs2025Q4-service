import { IsNumber, IsUUID } from 'class-validator';
import { IUser } from 'src/types';
import { Column, Entity, ObjectLiteral, PrimaryColumn } from 'typeorm';

@Entity()
export class User implements IUser, ObjectLiteral {
  @IsUUID()
  @PrimaryColumn()
  id!: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @IsNumber()
  @Column({ type: 'int' })
  version: number;

  @IsNumber()
  @Column({ type: 'bigint' })
  createdAt: number;

  @IsNumber()
  @Column({ type: 'bigint' })
  updatedAt: number;
}
