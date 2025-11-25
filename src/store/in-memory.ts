import type { Store } from './interfaces';
import { randomUUID } from 'node:crypto';

export class InMemoryStore<T, C, U = Partial<C>> implements Store<T, C, U> {
  protected store = new Map<string, T>();

  async create(dto: C): Promise<T> {
    const id = randomUUID();
    const entity: T = {
      id: id,
      ...dto,
    } as T;
    this.store.set(id, entity);
    return entity;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.store.values());
  }

  async findOne(id: string): Promise<T | undefined> {
    return this.store.get(id);
  }

  async update(id: string, updateDto: U): Promise<T | undefined> {
    const oldvalue = this.store.get(id);
    if (!oldvalue) return undefined;

    const updated = { ...oldvalue, ...updateDto };
    this.store.set(id, updated);
    return updated;
  }

  async remove(id: string) {
    return this.store.delete(id);
  }

  hasObject(id: string): boolean {
    return this.store.has(id);
  }
}
