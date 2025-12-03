import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import type { ITrack } from 'src/types';

export class CreateTrackDto implements Omit<ITrack, 'id'> {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @ValidateIf((obj) => obj.artistId !== null)
  @IsString()
  artistId!: string | null;
  @ValidateIf((obj) => obj.albumId !== null)
  @IsString()
  albumId!: string | null;
  @IsNumber()
  duration!: number;
}
