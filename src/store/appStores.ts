import type {
  FavoritesResponse,
  IAlbum,
  IArtist,
  ITrack,
  IUser,
} from 'src/types';
import type { CreateTrackDto } from 'src/track/dto/create-track.dto';
import type { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import type { UpdateUserDto } from 'src/user/dto/update-user.dto';
import type { CreateUserDto } from 'src/user/dto/create-user.dto';
import type { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import type { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import type { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import type { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { InMemoryStore } from './in-memory';

export class AlbumStore extends InMemoryStore<
  IAlbum,
  CreateAlbumDto,
  UpdateAlbumDto
> {}
export class ArtistStore extends InMemoryStore<
  IArtist,
  CreateArtistDto,
  UpdateArtistDto
> {}
export class TrackStore extends InMemoryStore<
  ITrack,
  CreateTrackDto,
  UpdateTrackDto
> {}
export class UserStore extends InMemoryStore<
  IUser,
  CreateUserDto,
  UpdateUserDto
> {}

export class FavoritesStore {
  private artists = new Map<string, IArtist>();
  private albums = new Map<string, IAlbum>();
  private tracks = new Map<string, ITrack>();

  addArtist(artist: IArtist) {
    this.artists.set(artist.id, artist);
  }
  addTrack(track: ITrack) {
    this.tracks.set(track.id, track);
  }
  addAlbum(album: IAlbum) {
    this.albums.set(album.id, album);
  }
  deleteArtist(id: string) {
    return this.artists.delete(id);
  }
  deleteTrack(id: string) {
    return this.tracks.delete(id);
  }
  deleteAlbum(id: string) {
    return this.albums.delete(id);
  }

  findAll(): FavoritesResponse {
    return {
      albums: [...this.albums.values()],
      artists: [...this.artists.values()],
      tracks: [...this.tracks.values()],
    };
  }
}
