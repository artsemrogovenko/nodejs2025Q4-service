import { IsNotEmpty, IsString } from 'class-validator';
import type { ICreateUserDto } from 'src/types';

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  login!: string;
  @IsString()
  @IsNotEmpty()
  password!: string;
}
