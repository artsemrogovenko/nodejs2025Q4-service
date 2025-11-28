import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FieldsValidator } from 'src/store/validation';
import { UserStore } from 'src/store/appStores';

@Module({
  controllers: [UserController],
  providers: [UserService, FieldsValidator, UserStore],
})
export class UserModule {}
