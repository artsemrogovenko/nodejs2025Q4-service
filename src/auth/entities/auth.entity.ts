import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class AuthUser {
  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  @IsOptional()
  refreshToken: string;
}
