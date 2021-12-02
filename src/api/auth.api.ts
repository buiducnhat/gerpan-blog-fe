
import axios from 'axios';

import { LoginDto, AuthResponseDto } from '@src/models/auth.model';

export const postLogin = async (loginDto: LoginDto) => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`;
  return (await axios.post(url, loginDto)).data as AuthResponseDto;
};
