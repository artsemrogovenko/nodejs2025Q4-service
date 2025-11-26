import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore, type AppStore } from 'src/store/appStores';
import type { IArtist } from 'src/types';
import { BaseService } from 'src/store/baseService';

@Injectable()
export class ArtistService extends BaseService<
  IArtist,
  CreateArtistDto,
  UpdateArtistDto
> {
  constructor(
    protected readonly store: ArtistStore,
    private readonly globalStore: AppStore,
  ) {
    super(store);
  }
  async remove(id: string): Promise<boolean> {
    return this.globalStore.deleteArtist(id);
  }
}
