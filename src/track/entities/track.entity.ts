import { IsEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { ITrack } from 'src/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectLiteral,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Track implements ITrack, ObjectLiteral {
  @IsUUID()
  @PrimaryColumn()
  id!: string;

  @Column()
  @IsString()
  name: string;

  @IsString()
  @IsEmpty()
  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @IsString()
  @IsEmpty()
  @Column({ type: 'uuid', nullable: true })
  albumId!: string | null;

  @IsNumber()
  @Column({ type: 'int' })
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;
}
