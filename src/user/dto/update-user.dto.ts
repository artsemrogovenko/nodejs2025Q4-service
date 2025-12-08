import { IsNotEmpty, IsString } from 'class-validator';
import type { IUpdatePasswordDto } from 'src/types';

export class UpdateUserDto implements IUpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword!: string;
  @IsString()
  @IsNotEmpty()
  newPassword!: string;
}
