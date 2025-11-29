import { Module } from '@nestjs/common';

import {
  GlobalService,
  ArtistStore,
  AlbumStore,
  TrackStore,
} from './appStores';
import { FavoritesStore } from './in-memory';

@Module({
  providers: [
    GlobalService,
    ArtistStore,
    AlbumStore,
    TrackStore,
    FavoritesStore,
  ],
  exports: [GlobalService, ArtistStore, AlbumStore, TrackStore, FavoritesStore],
})
export class SharedStoreModule {}
