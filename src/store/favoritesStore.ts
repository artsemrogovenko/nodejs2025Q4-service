import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { IFavorites } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesDB {
  constructor(
    @InjectRepository(Favorite)
    protected readonly store: Repository<Favorite>,
  ) {}

  async addArtist(artistId: string): Promise<IFavorites> {
    const favorites = await this.getAll();

    if (!favorites.artists.includes(artistId)) {
      favorites.artists.push(artistId);
      await this.store.save(favorites);
    }

    return favorites;
  }

  async addTrack(trackId: string): Promise<IFavorites> {
    const favorites = await this.getAll();

    if (!favorites.tracks.includes(trackId)) {
      favorites.tracks.push(trackId);
      await this.store.save(favorites);
    }

    return favorites;
  }

  async addAlbum(albumId: string): Promise<IFavorites> {
    const favorites = await this.getAll();

    if (!favorites.albums.includes(albumId)) {
      favorites.albums.push(albumId);
      await this.store.save(favorites);
    }

    return favorites;
  }

  async deleteArtist(artistId: string): Promise<boolean> {
    const favorites = await this.getAll();
    const initialLength = favorites.artists.length;

    favorites.artists = favorites.artists.filter((id) => id !== artistId);

    if (favorites.artists.length !== initialLength) {
      await this.store.save(favorites);
      return true;
    }

    return false;
  }

  async deleteTrack(trackId: string): Promise<boolean> {
    const favorites = await this.getAll();
    const initialLength = favorites.tracks.length;

    favorites.tracks = favorites.tracks.filter((id) => id !== trackId);

    if (favorites.tracks.length !== initialLength) {
      await this.store.save(favorites);
      return true;
    }

    return false;
  }

  async deleteAlbum(albumId: string): Promise<boolean> {
    const favorites = await this.getAll();
    const initialLength = favorites.albums.length;

    favorites.albums = favorites.albums.filter((id) => id !== albumId);

    if (favorites.albums.length !== initialLength) {
      await this.store.save(favorites);
      return true;
    }

    return false;
  }

  async getAll(): Promise<IFavorites> {
    let favorites = await this.store.findOne({ where: {} });

    if (!favorites) {
      favorites = this.store.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      await this.store.save(favorites);
    }

    return favorites;
  }
}
