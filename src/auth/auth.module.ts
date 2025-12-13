import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthUser } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserRepository } from './repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthUserRepository, JwtService],
  imports: [
    TypeOrmModule.forFeature([AuthUser]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME as any },
    }),
  ],
  exports: [JwtService],
})
export class AuthModule {}
