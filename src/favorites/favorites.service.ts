import { Injectable } from '@nestjs/common';
import type { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import type { CreateTrackDto } from 'src/track/dto/create-track.dto';
import type { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import type { IAlbum, IArtist, ITrack } from 'src/types';

@Injectable()
export class FavoritesService {
  private artists: IArtist[];
  private albums: IAlbum[];
  private tracks: ITrack[];

  addArtist(favoriteArtistDtoDto: CreateArtistDto) {
    throw new Error('Method not implemented.');
  }
  addTrack(favoriteTrackDto: CreateTrackDto) {
    throw new Error('Method not implemented.');
  }
  addAlbum(favoriteAlbumDto: CreateAlbumDto) {
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

  findAll() {
    return `This action returns all favorites`;
  }
}
