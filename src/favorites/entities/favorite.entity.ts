import { IsArray } from 'class-validator';
import type { IFavorites } from 'src/types';
import { Entity } from 'typeorm';

@Entity()
export class Favorite implements IFavorites {
  @IsArray()
  artists!: string[];
  @IsArray()
  albums!: string[];
  @IsArray()
  tracks!: string[];
}
