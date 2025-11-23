import type { IArtist } from 'src/types';

export class CreateArtistDto implements IArtist {
  id: string;
  name: string;
  grammy: boolean;
}
