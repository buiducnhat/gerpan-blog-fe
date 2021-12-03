import axios, { AxiosPromise, AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';

interface ICallApi {
  url: string;
  params?: any;
  method: Method;
  token?: string;
  data?: any;
}

export function callApi<Type>(config: ICallApi): AxiosPromise<Type> {
  const { url, method, data, params, token } = config;

  const axiosConfig: AxiosRequestConfig = {
    url,
    params,
    method,
    data
  };
  const headers: AxiosRequestHeaders = {
    Authorization: `Bearer ${token}`
  };
  if (token) {
    axiosConfig.headers = headers;
  }

  return axios(axiosConfig) as AxiosPromise<Type>;
}
