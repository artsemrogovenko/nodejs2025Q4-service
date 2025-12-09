import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  signup(dto: SignUpDto) {
    throw new Error('Method not implemented.');
  }
  refresh(dto: RefreshDto) {
    throw new Error('Method not implemented.');
  }
  login(dto: LoginDto) {
    throw new Error('Method not implemented.');
  }
}

  