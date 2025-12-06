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

  async addArtist(id: string) {
    const artist = await this.artistStore.findOne(id);
    if (artist) {
      return this.favoritesStore.addArtist(artist);
    }
    return false;
  }
  async addTrack(id: string) {
    const track = await this.trackStore.findOne(id);
    if (track) {
      return this.favoritesStore.addTrack(track);
    }
    return false;
  }
  async addAlbum(id: string) {
    const album = await this.albumStore.findOne(id);
    if (album) {
      return this.favoritesStore.addAlbum(album);
    }
    return false;
  }
  deleteArtist(id: string) {
    return this.favoritesStore.deleteArtist(id);
  }
  deleteTrack(id: string) {
    return this.favoritesStore.deleteTrack(id);
  }
  deleteAlbum(id: string) {
    return this.favoritesStore.deleteAlbum(id);
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
