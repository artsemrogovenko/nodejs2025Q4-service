import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { SharedStoreModule } from 'src/store/store.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [SharedStoreModule],
})
export class TrackModule {}
