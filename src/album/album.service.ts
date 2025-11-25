import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStore } from 'src/store/appStores';
import { BaseService } from 'src/store/baseService';
import { IAlbum } from 'src/types';

@Injectable()
export class AlbumService extends BaseService<
  IAlbum,
  CreateAlbumDto,
  UpdateAlbumDto
> {
  constructor(protected readonly store: AlbumStore) {
    super(store);
  }
}
