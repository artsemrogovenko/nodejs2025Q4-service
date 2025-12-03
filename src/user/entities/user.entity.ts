import { IsNumber, IsUUID } from 'class-validator';
import { Column, Entity, ObjectLiteral, PrimaryColumn } from 'typeorm';

@Entity()
export class User implements ObjectLiteral {
  @IsUUID()
  @PrimaryColumn()
  id!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @IsNumber()
  @Column()
  version!: number;

  @IsNumber()
  @Column({ type: 'bigint' })
  createdAt!: number;

  @IsNumber()
  @Column({ type: 'bigint' })
  updatedAt!: number;
}
