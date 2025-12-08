import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { IArtist } from 'src/types';
import {
  Column,
  Entity,
  ObjectLiteral,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Artist implements IArtist, ObjectLiteral {
  @IsUUID()
  @PrimaryColumn()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsBoolean()
  @Column({ type: 'boolean' })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}
