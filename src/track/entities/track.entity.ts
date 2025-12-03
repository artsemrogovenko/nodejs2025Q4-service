import { IsEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import type { ITrack } from 'src/types';
import { Entity } from 'typeorm';

@Entity()
export class Track implements ITrack {
  @IsUUID()
  id!: string;

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
