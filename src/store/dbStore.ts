import { Repository, ObjectLiteral } from 'typeorm';
import { Store } from './interfaces';
import { plainToInstance } from 'class-transformer';
import { uuid } from 'src/utils/utils';

export abstract class PostgresStore<
  T extends ObjectLiteral,
  C,
  U,
> implements Store<T, C, U> {
  protected abstract store: new () => T;

  constructor(protected readonly repository: Repository<T>) {}

  async create(dto: C): Promise<T> {
    const entity = plainToInstance(this.store, {
      ...dto,
      id: uuid(),
    });
    return this.repository.save(entity as any);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<T | undefined> {
    const entity = await this.repository.findOne({ where: { id } as any });
    return entity || undefined;
  }

  async update(id: string, updateDto: U): Promise<T | undefined> {
    await this.repository.update(id, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== null && result.affected > 0;
  }
  async hasObject(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { id } as any });
    return count > 0;
  }
}
