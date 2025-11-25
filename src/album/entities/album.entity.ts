import type { IAlbum } from 'src/types';

export class Album implements IAlbum {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly year: number,
    public readonly artistId: string | null = null,
  ) {}
}
