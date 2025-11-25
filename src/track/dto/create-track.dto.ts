import { IsEmpty, IsNumber, IsString } from 'class-validator';
import type { ITrack } from 'src/types';

export class CreateTrackDto implements Omit<ITrack, 'id'> {
  @IsString()
  name!: string;
  @IsString()
  @IsEmpty()
  artistId!: string | null;
  @IsString()
  @IsEmpty()
  albumId!: string | null;
  @IsNumber()
  duration!: number;
}
