import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { SharedStoreModule } from 'src/store/store.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [SharedStoreModule],
})
export class AlbumModule {}
