import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Column, Entity, ObjectLiteral, PrimaryColumn } from 'typeorm';

@Entity()
export class Album implements ObjectLiteral {
  @IsUUID()
  @PrimaryColumn()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  name!: string;

  @IsNumber()
  @Column({ type: 'int' })
  year!: number;

  @IsString()
  @IsEmpty()
  @Column()
  artistId!: string | null;
}
