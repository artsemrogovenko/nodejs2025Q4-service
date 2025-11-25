import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { SharedStoreModule } from 'src/store/store.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [SharedStoreModule],
})
export class ArtistModule {}
