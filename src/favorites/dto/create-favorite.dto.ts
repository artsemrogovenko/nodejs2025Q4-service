import { IsArray } from 'class-validator';
import type { IFavorites } from 'src/types';

export class CreateFavoriteDto implements IFavorites {
  @IsArray()
  artists!: string[];

  @IsArray()
  albums!: string[];

  @IsArray()
  tracks!: string[];
}
