import { Injectable } from '@nestjs/common';
import { AlbumStore, ArtistStore, TrackStore } from 'src/store/appStores';
import { FavoritesStore } from 'src/store/in-memory';
import { FavoritesResponse, IAlbum, IArtist, ITrack } from 'src/types';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesStore: FavoritesStore,
    private albumStore: AlbumStore,
    private artistStore: ArtistStore,
    private trackStore: TrackStore,
  ) {}

  addArtist(id: string) {
    throw new Error('Method not implemented.');
  }
  addTrack(id: string) {
    throw new Error('Method not implemented.');
  }
  addAlbum(id: string) {
    throw new Error('Method not implemented.');
  }
  deleteArtist(id: string) {
    throw new Error('Method not implemented.');
  }
  deleteTrack(id: string) {
    throw new Error('Method not implemented.');
  }
  deleteAlbum(id: string) {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<FavoritesResponse> {
    const { albums, artists, tracks } = await this.favoritesStore.getAll();
    const [alb, art, trks] = await Promise.all([
      Promise.all(albums.map((id) => this.albumStore.findOne(id))),
      Promise.all(artists.map((id) => this.artistStore.findOne(id))),
      Promise.all(tracks.map((id) => this.trackStore.findOne(id))),
    ]);

    return {
      albums: alb.filter(Boolean) as IAlbum[],
      artists: art.filter(Boolean) as IArtist[],
      tracks: trks.filter(Boolean) as ITrack[],
    };
  }
}
