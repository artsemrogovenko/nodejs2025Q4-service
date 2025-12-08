import { Module } from '@nestjs/common';

import {
  GlobalService,
  ArtistStore,
  AlbumStore,
  TrackStore,
} from './appStores';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { FavoritesDB } from './favoritesStore';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@Module({
  providers: [GlobalService, ArtistStore, AlbumStore, TrackStore, FavoritesDB],
  exports: [GlobalService, ArtistStore, AlbumStore, TrackStore, FavoritesDB],
  imports: [
    TypeOrmModule.forFeature([Artist]),
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([Favorite]),
  ],
})
export class SharedStoreModule {}
