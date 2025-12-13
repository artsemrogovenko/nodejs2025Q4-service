import type { CreateTrackDto } from 'src/track/dto/create-track.dto';
import type { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import type { UpdateUserDto } from 'src/user/dto/update-user.dto';
import type { CreateUserDto } from 'src/user/dto/create-user.dto';
import type { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import type { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import type { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import type { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MyNotFound } from 'src/utils/utils';
import { PostgresStore } from './dbStore';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesDB } from './favoritesStore';

@Injectable()
export class AlbumStore extends PostgresStore<
  Album,
  CreateAlbumDto,
  UpdateAlbumDto
> {
  protected store: new () => Album;

  constructor(
    @InjectRepository(Album)
    protected readonly repository: Repository<Album>,
  ) {
    super(repository);
  }
}

@Injectable()
export class ArtistStore extends PostgresStore<
  Artist,
  CreateArtistDto,
  UpdateArtistDto
> {
  protected store: new () => Artist;

  constructor(
    @InjectRepository(Artist)
    protected readonly repository: Repository<Artist>,
  ) {
    super(repository);
  }
}

@Injectable()
export class TrackStore extends PostgresStore<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {
  protected store: new () => Track;

  constructor(
    @InjectRepository(Track)
    protected readonly repository: Repository<Track>,
  ) {
    super(repository);
  }
}

@Injectable()
export class UserStore extends PostgresStore<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  protected store: new () => User;

  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const isExists = await this.getByLogin(dto.login);
    if (isExists) {
      throw new BadRequestException('User already exists');
    }
    return super.create(dto);
  }

  async getByLogin(login: string) {
    return await this.repository.findOne({
      where: { login: login },
    });
  }
}

@Injectable()
export class GlobalService {
  constructor(
    private artistStore: ArtistStore,
    private albumStore: AlbumStore,
    private trackStore: TrackStore,
    private favoritesStore: FavoritesDB,
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
      .filter((track) => track.artistId === artistId)
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
      const updated = { ...album, artistId: null };
      await this.albumStore.update(album.id, updated);
    }
  }

  async unrefAlbum(albumId: string) {
    if (!this.albumStore.hasObject(albumId)) MyNotFound('albumId', 'ALBUM');
    const track = (await this.trackStore.findAll())
      .filter((track) => track.albumId === albumId)
      .pop();
    if (track) {
      const updated = { ...track, albumId: null };
      await this.trackStore.update(track.id, updated);
    }
  }

  async deleteAlbum(albumId: string) {
    await this.unrefAlbum(albumId);
    this.favoritesStore.deleteAlbum(albumId);
    return await this.albumStore.remove(albumId);
  }

  async deleteArtist(artistId: string) {
    this.favoritesStore.deleteArtist(artistId);
    await this.unrefArtistInAlbum(artistId);
    await this.unrefArtistInTrack(artistId);
    return await this.artistStore.remove(artistId);
  }
}
