import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { SharedStoreModule } from 'src/store/store.module';
import { FieldsValidator } from 'src/store/validation';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FieldsValidator],
  imports: [SharedStoreModule],
})
export class TrackModule {}
