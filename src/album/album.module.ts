import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { SharedStoreModule } from 'src/store/store.module';
import { FieldsValidator } from 'src/store/validation';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, FieldsValidator],
  imports: [SharedStoreModule],
})
export class AlbumModule {}
