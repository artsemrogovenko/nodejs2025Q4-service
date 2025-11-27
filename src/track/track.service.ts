import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStore, AppStore } from 'src/store/appStores';
import { ITrack } from 'src/types';
import { BaseService } from 'src/store/baseService';

@Injectable()
export class TrackService extends BaseService<
  ITrack,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor(
    protected readonly store: TrackStore,
    private readonly globalStore: AppStore,
  ) {
    super(store);
  }

  async update(id: string, updateDto: UpdateTrackDto): Promise<ITrack> {
    const track = await this.store.findOne(id);
    if (track) {
      if (track.albumId !== updateDto.albumId && updateDto.albumId) {
        await this.globalStore.refAlbumToTrack(updateDto.albumId, track.id);
      }
      if (track.artistId !== updateDto.artistId && updateDto.artistId) {
        await this.globalStore.refArtistToTrack(updateDto.artistId, track.id);
      }
      return this.store.update(track.id, updateDto);
    }
    return track;
  }
}
