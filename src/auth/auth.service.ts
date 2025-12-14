import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { loadEnvFile } from 'process';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtPayload, Token } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { UserStore } from 'src/store/appStores';

loadEnvFile('.env');

@Injectable()
export class AuthService {
  constructor(
    private readonly userStore: UserStore,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
    const salt = await bcrypt.genSalt(Number(process.env.CRYPT_SALT));
    const hash = await bcrypt.hash(dto.password, salt);

    const user = await this.userStore.create({
      login: dto.login,
      password: hash,
    });

    return user;
  }

  async refresh(dto: RefreshDto): Promise<Token> {
    if (!dto || Object.keys(dto).length === 0) {
      throw new UnauthorizedException('No refresh token');
    }
    try {
      const payload = (await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      })) as JwtPayload;

      const token = await this.generateToken(payload);

      return token;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ForbiddenException('Expired refresh token');
      }
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  async login(dto: LoginDto): Promise<Token> {
    const user = await this.userStore.getByLogin(dto.login);
    if (!user) {
      throw new BadRequestException('Incorrect username');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new ForbiddenException('Authentication failed');
    }

    const token = await this.generateToken({
      userId: user.id,
      login: user.login,
    });

    return token;
  }

  private async generateToken(jwt: JwtPayload): Promise<Token> {
    const payload: JwtPayload = {
      userId: jwt.userId,
      login: jwt.login,
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
