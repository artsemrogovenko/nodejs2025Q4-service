import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FieldsValidator } from 'src/store/validation';
import { UserStore } from 'src/store/appStores';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, FieldsValidator, UserStore],
  exports: [UserStore],
})
export class UserModule {}
