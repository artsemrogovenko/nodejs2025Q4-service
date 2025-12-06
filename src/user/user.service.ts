import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStore } from 'src/store/appStores';
import { IUser } from 'src/types';
import { BaseService } from 'src/store/baseService';
import { timestamp } from 'src/utils/utils';

@Injectable()
export class UserService extends BaseService<
  IUser,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(protected readonly store: UserStore) {
    super(store);
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<IUser> {
    const oldvalue = await this.store.findOne(id);
    if (!oldvalue) return undefined;
    if (oldvalue.password !== updateDto.oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }
    const updated: IUser = {
      ...oldvalue,
      password: updateDto.newPassword,
      version: oldvalue.version + 1,
      updatedAt: timestamp(),
    };
    this.store.db.set(id, updated);
    return updated;
  }

  async create(createDto: CreateUserDto): Promise<IUser> {
    const user: IUser = {
      id: null,
      login: createDto.login,
      password: createDto.password,
      version: 1,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    return await this.store.create(user);
  }
}
