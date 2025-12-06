export interface Store<T, C, U = Partial<C>> {
  create(createDto: C): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | undefined>;
  update(id: string, updateDto: U): Promise<T | undefined>;
  remove(id: string): Promise<boolean | undefined>;
}
