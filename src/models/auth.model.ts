import { IUserBasic } from './user.model';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponseDto {
  token: string;
  user: IUserBasic;
}
