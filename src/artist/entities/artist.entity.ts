import type { IArtist } from 'src/types';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;
}
