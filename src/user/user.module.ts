import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedStoreModule } from 'src/store/store.module';
import { FieldsValidator } from 'src/store/validation';

@Module({
  controllers: [UserController],
  providers: [UserService, FieldsValidator],
  imports: [SharedStoreModule],
})
export class UserModule {}
