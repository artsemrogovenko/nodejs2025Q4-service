import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { SharedStoreModule } from 'src/store/store.module';
import { FieldsValidator } from 'src/store/validation';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, FieldsValidator],
  imports: [SharedStoreModule],
})
export class ArtistModule {}
