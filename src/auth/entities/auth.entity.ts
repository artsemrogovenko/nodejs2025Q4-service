import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class AuthUser {
  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  passwordHash: string;
}
