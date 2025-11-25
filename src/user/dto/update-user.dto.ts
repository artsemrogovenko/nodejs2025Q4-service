import { IsString } from 'class-validator';
import type { IUpdatePasswordDto } from 'src/types';

export class UpdateUserDto implements IUpdatePasswordDto {
  @IsString()
  oldPassword!: string;
  @IsString()
  newPassword!: string;
}
