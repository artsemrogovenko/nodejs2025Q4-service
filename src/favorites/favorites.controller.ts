import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesInterceptor } from 'src/store/interceptors';

@Controller('favs')
@UseInterceptors(FavoritesInterceptor)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addArtist(id);
  }
  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addTrack(id);
  }
  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addAlbum(id);
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
