import type { IAlbum, IArtist, ITrack, IUser } from 'src/types';
import type { CreateTrackDto } from 'src/track/dto/create-track.dto';
import type { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import type { UpdateUserDto } from 'src/user/dto/update-user.dto';
import type { CreateUserDto } from 'src/user/dto/create-user.dto';
import type { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import type { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import type { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import type { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { InMemoryStore, FavoritesStore } from './in-memory';
import { Injectable } from '@nestjs/common';
import { MyNotFound } from 'src/utils/utils';

@Injectable()
export class AlbumStore extends InMemoryStore<
  IAlbum,
  CreateAlbumDto,
  UpdateAlbumDto
> {}

@Injectable()
export class ArtistStore extends InMemoryStore<
  IArtist,
  CreateArtistDto,
  UpdateArtistDto
> {}

@Injectable()
export class TrackStore extends InMemoryStore<
  ITrack,
  CreateTrackDto,
  UpdateTrackDto
> {}

@Injectable()
export class UserStore extends InMemoryStore<
  IUser,
  CreateUserDto,
  UpdateUserDto
> {}

@Injectable()
export class AppStore {
  constructor(
    private artistStore: ArtistStore,
    private albumStore: AlbumStore,
    private trackStore: TrackStore,
    private favoritesStore: FavoritesStore,
  ) {}

  async refArtistToAlbum(albumId: string, artistId: string) {
    if (!this.artistStore.hasObject(artistId)) {
      MyNotFound('artistId', 'ARTIST');
    }
    const album = await this.albumStore.findOne(albumId);
    if (album) {
      album.artistId = artistId;
      await this.albumStore.update(album.id, album);
    } else {
      MyNotFound('albumId', 'ALBUM');
    }
  }
  async refArtistToTrack(trackId: string, artistId: string) {
    if (!this.artistStore.hasObject(artistId)) {
      MyNotFound('artistId', 'ARTIST');
    }
    const track = await this.trackStore.findOne(trackId);
    if (track) {
      track.artistId = artistId;
      await this.trackStore.update(track.id, track);
    } else {
      MyNotFound('trackId', 'TRACK');
    }
  }
  async refAlbumToTrack(trackId: string, albumId: string) {
    if (!this.albumStore.hasObject(albumId)) {
      MyNotFound('albumId', 'ALBUM');
    }
    const track = await this.trackStore.findOne(trackId);
    if (track) {
      track.albumId = albumId;
      await this.trackStore.update(track.id, track);
    } else {
      MyNotFound('trackId', 'TRACK');
    }
  }

  async unrefArtistInTrack(artistId: string) {
    if (!this.artistStore.hasObject(artistId)) MyNotFound('artistId', 'ARTIST');
    const track = (await this.trackStore.findAll())
      .filter((track) => track.albumId === artistId)
      .pop();
    if (track) {
      track.artistId = null;
      await this.trackStore.update(track.id, track);
    }
  }

  async unrefArtistInAlbum(artistId: string) {
    if (!this.artistStore.hasObject(artistId)) MyNotFound('artistId', 'ARTIST');
    const album = (await this.albumStore.findAll())
      .filter((album) => album.artistId === artistId)
      .pop();
    if (album) {
      album.artistId = null;
      await this.albumStore.update(album.id, album);
    }
  }

  async unrefAlbum(albumId: string) {
    if (!this.albumStore.hasObject(albumId)) MyNotFound('albumId', 'ALBUM');
    const track = (await this.trackStore.findAll())
      .filter((track) => track.albumId === albumId)
      .pop();
    if (track) {
      track.albumId = null;
      await this.albumStore.update(track.id, track);
    }
  }

  async deleteAlbum(albumId: string) {
    this.favoritesStore.deleteAlbum(albumId);
    await this.unrefAlbum(albumId);
    return await this.albumStore.remove(albumId);
  }

  async deleteArtist(artistId: string) {
    this.favoritesStore.deleteArtist(artistId);
    await this.unrefArtistInAlbum(artistId);
    await this.unrefArtistInTrack(artistId);
    return await this.artistStore.remove(artistId);
  }
}
