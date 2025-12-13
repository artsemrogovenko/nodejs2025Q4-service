import { TypeOrmModule } from '@nestjs/typeorm';
import { loadEnvFile } from 'node:process';
import { User } from './user/entities/user.entity';
import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Track } from './track/entities/track.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { existsSync } from 'node:fs';
import { AuthUser } from './auth/entities/auth.entity';

loadEnvFile('.env');

const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const PORT = Number(process.env.PORT_DB);
const HOST = () => {
  return existsSync('/.dockerenv') ? process.env.HOST_DB : 'localhost';
};

export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: HOST(),
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: [User, Album, Artist, Track, Favorite, AuthUser],
  synchronize: false,
  // logging: ['error', 'query'],
});
