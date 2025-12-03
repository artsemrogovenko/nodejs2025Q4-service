import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import type { IAlbum } from 'src/types';
import { Entity } from 'typeorm';

@Entity()
export class Album implements IAlbum {
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  year!: number;

  @IsString()
  @IsEmpty()
  artistId!: string | null;
}
