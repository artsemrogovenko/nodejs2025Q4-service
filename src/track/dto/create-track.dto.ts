import type { ITrack } from 'src/types';

export class CreateTrackDto implements ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
