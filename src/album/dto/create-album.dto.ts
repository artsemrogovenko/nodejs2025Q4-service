import { IsNumber, IsOptional, IsString } from 'class-validator';
import type { IAlbum } from 'src/types';

export class CreateAlbumDto implements IAlbum {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsNumber()
  year!: number;

  @IsOptional()
  @IsString()
  artistId!: string | null;
}
