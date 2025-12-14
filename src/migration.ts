import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { DataSource } from 'typeorm';
import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { Track } from './track/entities/track.entity';
import { User } from './user/entities/user.entity';
loadEnvFile('.env');
const HOST = () => {
  return existsSync('/.dockerenv') ? process.env.HOST_DB : 'localhost';
};

const AppDataSource = new DataSource({
  type: 'postgres',
  host: HOST(),
  port: parseInt(process.env.PORT_DB),
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [User, Album, Artist, Track, Favorite],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  // migrationsRun:true
});

module.exports = AppDataSource;
