import { TypeOrmModule } from '@nestjs/typeorm';
import { loadEnvFile } from 'node:process';

loadEnvFile('.env');

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: [__dirname + '/**/*.entity{.ts}'],
  synchronize: true,
});
