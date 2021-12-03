import { LoginDto, AuthResponseDto, RegisterDto } from '@src/models/auth.model';

import { callApi } from '@src/utils/api.util';
import { getToken } from '@src/utils/token.util';

export const apiLogin = async (loginDto: LoginDto) => {
  return await callApi<AuthResponseDto>({
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
    method: 'POST',
    data: loginDto
  });
};

export const apiRegister = async (registerDto: RegisterDto) => {
  return await callApi<AuthResponseDto>({
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
    method: 'POST',
    data: registerDto
  });
};

export const apiMe = async () => {
  const token = getToken();
  return await callApi<AuthResponseDto>({
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/me`,
    method: 'GET',
    token
  });
};
