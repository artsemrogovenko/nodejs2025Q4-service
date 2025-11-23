import type { IUpdatePasswordDto } from 'src/types';

export class UpdateUserDto implements IUpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}
