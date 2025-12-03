import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStore, GlobalService } from 'src/store/appStores';
import { ITrack } from 'src/types';
import { BaseService } from 'src/store/baseService';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService extends BaseService<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor(
    protected readonly store: TrackStore,
    private readonly globalService: GlobalService,
  ) {
    super(store);
  }

  async update(id: string, updateDto: UpdateTrackDto): Promise<ITrack> {
    const track = await this.store.findOne(id);
    if (track) {
      if (track.albumId !== updateDto.albumId) {
        if (updateDto.albumId) {
          await this.globalService.refAlbumToTrack(track.id, updateDto.albumId);
        } else {
          await this.globalService.unrefArtistInAlbum(id);
        }
      }
      if (track.artistId !== updateDto.artistId) {
        if (updateDto.artistId) {
          await this.globalService.refArtistToTrack(
            track.id,
            updateDto.artistId,
          );
        } else {
          await this.globalService.unrefArtistInTrack(track.artistId);
        }
      }
      return this.store.update(track.id, updateDto);
    }
    return track;
  }
}
