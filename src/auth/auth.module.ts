import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthUser } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserRepository } from './repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthUserRepository, JwtService],
  imports: [TypeOrmModule.forFeature([AuthUser])],
})
export class AuthModule {}
