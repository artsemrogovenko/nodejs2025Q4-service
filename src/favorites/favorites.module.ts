import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SharedStoreModule } from 'src/store/store.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [SharedStoreModule],
})
export class FavoritesModule {}
