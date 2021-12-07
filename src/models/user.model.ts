export interface IUserBasic {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  bio?: string;
}

export interface UpdateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
}
