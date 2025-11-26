import { IArtist, IAlbum, ITrack, IFavorites } from 'src/types';
import type { Store } from './interfaces';
import { getIndex, uuid } from 'src/utils/utils';
import { Injectable } from '@nestjs/common';

export class InMemoryStore<T, C, U = Partial<C>> implements Store<T, C, U> {
  protected store = new Map<string, T>();

  async create(dto: C): Promise<T> {
    const id = uuid();
    const entity: T = {
      id: id,
      ...dto,
    } as T;
    this.store.set(id, entity);
    return entity;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.store.values());
  }

  async findOne(id: string): Promise<T | undefined> {
    return this.store.get(id);
  }

  async update(id: string, updateDto: U): Promise<T | undefined> {
    const oldvalue = this.store.get(id);
    if (!oldvalue) return undefined;

    const updated = { ...oldvalue, ...updateDto };
    this.store.set(id, updated);
    return updated;
  }

  async remove(id: string) {
    return this.store.delete(id);
  }

  hasObject(id: string): boolean {
    return this.store.has(id);
  }
  public get db(): Map<string, T> {
    return this.store;
  }
}

@Injectable()
export class FavoritesStore implements IFavorites {
  artists: string[] = [];
  albums: string[] = [];
  tracks: string[] = [];

  addArtist(artist: IArtist) {
    this.artists.push(artist.id);
    return true;
  }
  addTrack(track: ITrack) {
    this.tracks.push(track.id);
    return true;
  }
  addAlbum(album: IAlbum) {
    this.albums.push(album.id);
    return true;
  }
  deleteArtist(id: string) {
    const index = getIndex(this.artists, id);
    if (index > -1) {
      this.artists.slice(index, 1);
      return true;
    }
    return false;
  }
  deleteTrack(id: string) {
    const index = getIndex(this.tracks, id);
    if (index > -1) {
      this.tracks.splice(index, 1);
      return true;
    }
    return false;
  }
  deleteAlbum(id: string) {
    const index = getIndex(this.albums, id);
    if (index > -1) {
      this.albums.splice(index, 1);
      return true;
    }
    return false;
  }
  getAll(): Promise<IFavorites> {
    return Promise.resolve({
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    });
  }
}
