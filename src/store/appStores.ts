import type { IAlbum, IArtist, ITrack, IUser } from 'src/types';
import type { CreateTrackDto } from 'src/track/dto/create-track.dto';
import type { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import type { UpdateUserDto } from 'src/user/dto/update-user.dto';
import type { CreateUserDto } from 'src/user/dto/create-user.dto';
import type { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import type { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import type { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import type { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { InMemoryStore } from './in-memory';
import { Injectable } from '@nestjs/common';

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
    private userStore: UserStore,
  ) {}
  getArtistStore(): ArtistStore {
    return this.artistStore;
  }

  getAlbumStore(): AlbumStore {
    return this.albumStore;
  }

  getTrackStore(): TrackStore {
    return this.trackStore;
  }

  getUserStore(): UserStore {
    return this.userStore;
  }
}
