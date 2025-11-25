import { IsNumber, IsOptional, IsString } from 'class-validator';
import type { IAlbum } from 'src/types';

export class CreateAlbumDto implements Omit<IAlbum, 'id'> {
  @IsString()
  name!: string;

  @IsNumber()
  year!: number;

  @IsOptional()
  @IsString()
  artistId!: string | null;
}
