import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStore, GlobalService } from 'src/store/appStores';
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
    protected readonly globalService: GlobalService,
  ) {
    super(store);
  }
  async remove(id: string): Promise<boolean> {
    return await this.globalService.deleteAlbum(id);
  }

  async update(id: string, updateDto: UpdateAlbumDto): Promise<IAlbum> {
    const album = await this.store.findOne(id);
    if (album) {
      if (album.artistId !== updateDto.artistId) {
        if (updateDto.artistId) {
          await this.globalService.refArtistToAlbum(
            album.id,
            updateDto.artistId,
          );
        } else {
          await this.globalService.unrefArtistInAlbum(album.artistId);
        }
        return this.store.update(album.id, updateDto);
      }
    }
    return album;
  }
}
