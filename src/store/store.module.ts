import { Module } from '@nestjs/common';

import {
  GlobalService,
  ArtistStore,
  AlbumStore,
  TrackStore,
} from './appStores';
import { FavoritesStore } from './in-memory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

@Module({
  providers: [
    GlobalService,
    ArtistStore,
    AlbumStore,
    TrackStore,
    FavoritesStore,
  ],
  exports: [GlobalService, ArtistStore, AlbumStore, TrackStore, FavoritesStore],
  imports: [
    TypeOrmModule.forFeature([Artist]),
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Track]),
  ],
})
export class SharedStoreModule {}
