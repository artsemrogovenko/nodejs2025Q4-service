import { ForbiddenException, Injectable } from '@nestjs/common';
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

  async update(id: string, updateDto: UpdateUserDto): Promise<IUser> {
    const oldvalue = await this.store.findOne(id);
    if (!oldvalue) return undefined;
    if (oldvalue.password !== updateDto.oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }
    const updated: IUser = { ...oldvalue, password: updateDto.newPassword };
    this.store.db.set(id, updated);
    return updated;
  }
}
