import { IsBoolean, IsString } from 'class-validator';
import type { IArtist } from 'src/types';

export class CreateArtistDto implements Omit<IArtist, 'id'> {
  @IsString()
  name!: string;

  @IsBoolean()
  grammy!: boolean;
}
