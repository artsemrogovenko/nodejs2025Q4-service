import type { IAlbum } from 'src/types';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
