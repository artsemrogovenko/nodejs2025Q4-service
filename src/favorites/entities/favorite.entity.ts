import { IsArray } from 'class-validator';
import type { IFavorites } from 'src/types';
import { Column, Entity, ObjectLiteral, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class Favorite implements IFavorites, ObjectLiteral {
  @IsArray()
  @Column({ type: 'uuid', array: true, default: [] })
  artists: string[];

  @IsArray()
  @Column({ type: 'uuid', array: true, default: [] })
  albums: string[];

  @IsArray()
  @Column({ type: 'uuid', array: true, default: [] })
  tracks: string[];

  @PrimaryGeneratedColumn('uuid')
  id: string;
}
