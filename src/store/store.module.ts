import { Module } from '@nestjs/common';

import {
  AppStore,
  ArtistStore,
  AlbumStore,
  TrackStore,
  UserStore,
} from './appStores';
import { FavoritesStore } from './in-memory';

@Module({
  providers: [
    AppStore,
    ArtistStore,
    AlbumStore,
    TrackStore,
    UserStore,
    FavoritesStore,
  ],
  exports: [
    AppStore,
    ArtistStore,
    AlbumStore,
    TrackStore,
    UserStore,
    FavoritesStore,
  ],
})
export class SharedStoreModule {}
