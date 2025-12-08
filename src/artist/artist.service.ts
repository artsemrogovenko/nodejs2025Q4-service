import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore, GlobalService } from 'src/store/appStores';
import { BaseService } from 'src/store/baseService';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService extends BaseService<
  Artist,
  CreateArtistDto,
  UpdateArtistDto
> {
  constructor(
    protected readonly store: ArtistStore,
    private readonly globalService: GlobalService,
  ) {
    super(store);
  }
  async remove(id: string): Promise<boolean> {
    return await this.globalService.deleteArtist(id);
  }
}
