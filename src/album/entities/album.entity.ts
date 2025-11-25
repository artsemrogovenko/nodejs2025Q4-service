import { IsEmpty, IsNumber, IsString } from 'class-validator';
import type { IAlbum } from 'src/types';

export class Album implements IAlbum {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsNumber()
  year!: number;

  @IsString()
  @IsEmpty()
  artistId!: string | null;
}
