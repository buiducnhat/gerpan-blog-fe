import { IUserBasic } from './user.model';

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  user: IUserBasic;
}
