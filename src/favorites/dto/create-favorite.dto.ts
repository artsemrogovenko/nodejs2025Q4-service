import type { IFavorites } from 'src/types';

export class CreateFavoriteDto implements IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
