import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  addArtist(@Body() favoriteArtistId: string) {
    return this.favoritesService.addArtist(favoriteArtistId);
  }
  @Post('track/:id')
  addTrack(@Body() favoriteTrackId: string) {
    return this.favoritesService.addTrack(favoriteTrackId);
  }
  @Post('album/:id')
  addAlbum(@Body() favoriteAlbumId: string) {
    return this.favoritesService.addAlbum(favoriteAlbumId);
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
