import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SharedStoreModule } from 'src/store/store.module';
import { FieldsValidator } from 'src/store/validation';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesDB } from 'src/store/favoritesStore';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FieldsValidator, FavoritesDB],
  imports: [SharedStoreModule, TypeOrmModule.forFeature([Favorite])],
})
export class FavoritesModule {}
