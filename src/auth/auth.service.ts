import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { loadEnvFile } from 'process';
import { uuid } from 'src/utils/utils';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthUser } from './entities/auth.entity';
import { JwtPayload, Token } from './interfaces';
import { AuthUserRepository } from './repository';
import { JwtService } from '@nestjs/jwt';

loadEnvFile('.env');

@Injectable()
export class AuthService {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto): Promise<{ message: string }> {
    const isExists = await this.authUserRepository.findByLogin(dto.login);
    if (isExists) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt(Number(process.env.CRYPT_SALT));
    const hash = await bcrypt.hash(dto.password, salt);

    await this.authUserRepository.create({
      id: uuid(),
      login: dto.login,
      passwordHash: hash,
    });

    return { message: 'User created successfully' };
  }

  async refresh(dto: RefreshDto): Promise<Token> {
    try {
      const payload = (await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      })) as JwtPayload;

      const user = await this.authUserRepository.findUserByRefreshToken(
        dto.refreshToken,
      );
      if (!user || user.id !== payload.userId) {
        throw new ForbiddenException('Invalid refresh token');
      }

      const token = await this.generateToken(user);

      await this.authUserRepository.updateRefreshToken(
        user.id,
        token.refreshToken,
      );

      return token;
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  async login(dto: LoginDto): Promise<Token> {
    const user = await this.authUserRepository.findByLogin(dto.login);
    if (!user || !user.passwordHash) {
      throw new BadRequestException('User is not exist');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatch) {
      throw new ForbiddenException('Authentication failed');
    }

    const token = await this.generateToken(user);

    await this.authUserRepository.updateRefreshToken(
      user.id,
      token.refreshToken,
    );

    return token;
  }

  private async generateToken(user: AuthUser): Promise<Token> {
    const payload: JwtPayload = {
      userId: user.id,
      login: user.login,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME as any,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME as any,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
