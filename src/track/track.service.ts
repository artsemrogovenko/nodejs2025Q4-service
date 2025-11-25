import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStore } from 'src/store/appStores';
import type { ITrack } from 'src/types';
import { BaseService } from 'src/store/baseService';

@Injectable()
export class TrackService extends BaseService<
  ITrack,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor(protected readonly store: TrackStore) {
    super(store);
  }
}
