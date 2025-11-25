import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedStoreModule } from 'src/store/store.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SharedStoreModule],
})
export class UserModule {}
