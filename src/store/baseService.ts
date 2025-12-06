import { BadRequestException } from '@nestjs/common';
import { isValidUuid } from 'src/utils/utils';
import { Store } from './interfaces';

export abstract class BaseService<T, C, U> {
  constructor(protected readonly store: Store<T, C, U>) {}

  async create(createDto: C): Promise<T> {
    return await this.store.create(createDto);
  }

  async findAll(): Promise<T[]> {
    return await this.store.findAll();
  }

  async findOne(id: string): Promise<T | undefined> {
    if (!isValidUuid(id)) throw new BadRequestException('UUID not valid');
    return await this.store.findOne(id);
  }

  async update(id: string, updateDto: U): Promise<T | undefined> {
    if (!isValidUuid(id)) throw new BadRequestException('UUID not valid');
    return await this.store.update(id, updateDto);
  }

  async remove(id: string): Promise<boolean> {
    if (!isValidUuid(id)) throw new BadRequestException('UUID not valid');
    return await this.store.remove(id);
  }
}
