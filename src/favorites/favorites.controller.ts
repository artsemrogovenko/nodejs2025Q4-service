import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import type { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import type { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import type { CreateTrackDto } from 'src/track/dto/create-track.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  addArtist(@Body() favoriteArtistDtoDto: CreateArtistDto) {
    return this.favoritesService.addArtist(favoriteArtistDtoDto);
  }
  @Post('track/:id')
  addTrack(@Body() favoriteTrackDto: CreateTrackDto) {
    return this.favoritesService.addTrack(favoriteTrackDto);
  }
  @Post('album/:id')
  addAlbum(@Body() favoriteAlbumDto: CreateAlbumDto) {
    return this.favoritesService.addAlbum(favoriteAlbumDto);
  }

  @Delete('artist/:id')
  deleteArtist(@Param('id') id: string) {
    return this.favoritesService.deleteArtist(id);
  }
  @Delete('track/:id')
  deleteTrack(@Param('id') id: string) {
    return this.favoritesService.deleteTrack(id);
  }
  @Delete('album/:id')
  deleteAlbum(@Param('id') id: string) {
    return this.favoritesService.deleteAlbum(id);
  }
}
