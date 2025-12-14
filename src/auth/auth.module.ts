import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { loadEnvFile } from 'process';
loadEnvFile('.env');

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME as any },
    }),
  ],
  exports: [JwtService],
})
export class AuthModule {}
