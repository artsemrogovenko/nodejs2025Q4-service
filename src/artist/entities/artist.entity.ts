import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Column, Entity, ObjectLiteral, PrimaryColumn } from 'typeorm';

@Entity()
export class Artist implements ObjectLiteral {
  @IsUUID()
  @PrimaryColumn()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  @Column({ type: 'boolean' })
  grammy!: boolean;
}
