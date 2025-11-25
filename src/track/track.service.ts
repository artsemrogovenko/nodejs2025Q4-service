import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStore } from 'src/store/appStores';

@Injectable()
export class TrackService {
  private store: TrackStore;
  constructor() {
    this.store = new TrackStore();
  }

  create(createTrackDto: CreateTrackDto) {
    return 'This action adds a new track';
  }

  findAll() {
    return `This action returns all track`;
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
