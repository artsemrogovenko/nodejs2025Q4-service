import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { IAlbum } from 'src/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectLiteral,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Album implements IAlbum, ObjectLiteral {
  @IsUUID()
  @PrimaryColumn()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @Column({ default: 'unknown' })
  name: string;

  @IsNumber()
  @Column({ type: 'int' })
  year: number;

  @IsString()
  @IsEmpty()
  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
