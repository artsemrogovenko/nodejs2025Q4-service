import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStore, type AppStore } from 'src/store/appStores';
import { BaseService } from 'src/store/baseService';
import { IAlbum } from 'src/types';

@Injectable()
export class AlbumService extends BaseService<
  IAlbum,
  CreateAlbumDto,
  UpdateAlbumDto
> {
  constructor(
    protected readonly store: AlbumStore,
    protected readonly globalStore: AppStore,
  ) {
    super(store);
  }
  async remove(id: string): Promise<boolean> {
    return this.globalStore.deleteAlbum(id);
  }
}
