import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import type { IArtist } from 'src/types';
import { Entity } from 'typeorm';

@Entity()
export class Artist implements IArtist {
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  grammy!: boolean;
}
