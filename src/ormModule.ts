import { TypeOrmModule } from '@nestjs/typeorm';
import { loadEnvFile } from 'node:process';
import { User } from './user/entities/user.entity';
import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Track } from './track/entities/track.entity';
import { Favorite } from './favorites/entities/favorite.entity';

loadEnvFile('.env');

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const PORT = Number(process.env.PORT_HOST);

export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: [User, Album, Artist, Track, Favorite],
  synchronize: true,
  logging: ['query'],
});
