import type { IFavorites } from 'src/types';

export class Favorite implements IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
