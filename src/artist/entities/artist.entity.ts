import { IsBoolean, IsString } from 'class-validator';
import type { IArtist } from 'src/types';

export class Artist implements IArtist {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsBoolean()
  grammy!: boolean;
}
