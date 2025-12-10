import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from './entities/auth.entity';

@Injectable()
export class AuthUserRepository {
  constructor(
    @InjectRepository(AuthUser)
    private readonly repository: Repository<AuthUser>,
  ) {}

  async create(data: DeepPartial<AuthUser>): Promise<AuthUser> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findOneById(id: string): Promise<AuthUser | null> {
    return await this.repository.findOne({ where: { id } as any });
  }

  async update(id: string, data: Partial<AuthUser>): Promise<AuthUser> {
    await this.repository.update(id, data as any);
    return await this.findOneById(id);
  }

  async findByLogin(login: string): Promise<AuthUser | null> {
    return await this.repository.findOne({ where: { login } as any });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<AuthUser> {
    return this.update(userId, { refreshToken } as any);
  }

  async findUserByRefreshToken(refreshToken: string): Promise<AuthUser | null> {
    return await this.repository.findOne({
      where: { refreshToken } as any,
    });
  }

  async existsByLogin(login: string): Promise<boolean> {
    const count = await this.repository.count({ where: { login } as any });
    return count > 0;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
