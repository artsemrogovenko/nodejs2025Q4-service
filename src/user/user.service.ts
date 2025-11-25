import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStore } from 'src/store/appStores';
import { IUser } from 'src/types';
import { BaseService } from 'src/store/baseService';

@Injectable()
export class UserService extends BaseService<
  IUser,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(protected readonly store: UserStore) {
    super(store);
  }
}
