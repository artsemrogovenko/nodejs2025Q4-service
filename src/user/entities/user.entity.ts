import { IsNumber, IsUUID } from 'class-validator';
import { IUser } from 'src/types';
import { Column, Entity, ObjectLiteral, PrimaryColumn } from 'typeorm';

@Entity()
export class User implements IUser, ObjectLiteral {
  @IsUUID()
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @IsNumber()
  @Column({ type: 'int', default: 1 })
  version: number;

  @IsNumber()
  @Column({ type: 'bigint', default: Date.now() })
  createdAt: number;

  @IsNumber()
  @Column({ type: 'bigint', default: Date.now() })
  updatedAt: number;
}
