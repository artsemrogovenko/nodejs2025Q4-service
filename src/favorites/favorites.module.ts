import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SharedStoreModule } from 'src/store/store.module';
import { FieldsValidator } from 'src/store/validation';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FieldsValidator],
  imports: [SharedStoreModule],
})
export class FavoritesModule {}
