import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import type { IAlbum } from 'src/types';

export class CreateAlbumDto implements Omit<IAlbum, 'id'> {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  year!: number;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsString()
  artistId!: string | null;
}
