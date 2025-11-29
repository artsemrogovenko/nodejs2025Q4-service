import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore, GlobalService } from 'src/store/appStores';
import { IArtist } from 'src/types';
import { BaseService } from 'src/store/baseService';

@Injectable()
export class ArtistService extends BaseService<
  IArtist,
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
