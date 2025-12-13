import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class AuthUser {
  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column({ nullable: true })
  @IsOptional()
  refreshToken: string;
}
