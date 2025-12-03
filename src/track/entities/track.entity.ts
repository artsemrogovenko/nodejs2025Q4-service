import { IsEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Column, Entity, ObjectLiteral, PrimaryColumn } from 'typeorm';

@Entity()
export class Track implements ObjectLiteral {
  @IsUUID()
  @PrimaryColumn()
  id!: string;

  @Column()
  @IsString()
  name!: string;

  @IsString()
  @IsEmpty()
  @Column()
  artistId!: string | null;

  @IsString()
  @IsEmpty()
  @Column()
  albumId!: string | null;

  @IsNumber()
  @Column({ type: 'int' })
  duration!: number;
}
