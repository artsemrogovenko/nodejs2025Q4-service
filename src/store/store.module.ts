import { Module } from '@nestjs/common';

import { AppStore, ArtistStore, AlbumStore, TrackStore } from './appStores';
import { FavoritesStore } from './in-memory';

@Module({
  providers: [AppStore, ArtistStore, AlbumStore, TrackStore, FavoritesStore],
  exports: [AppStore, ArtistStore, AlbumStore, TrackStore, FavoritesStore],
})
export class SharedStoreModule {}
