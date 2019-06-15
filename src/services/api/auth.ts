import axios, { AxiosResponse } from 'axios/index';
import { API_ROOT } from '../../config/config';
import { catchResponseError } from '../../libs/api';

interface SignInRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface SignInResponse {
  token: string;
}

interface SignUpResponse {
  token: string;
}

export const signIn = ({ email, password }: SignInRequest) => {
  return axios
    .post(`${API_ROOT}/auth/signin`, { email, password })
    .then((response: AxiosResponse<SignInResponse>) => {
      return response.data.token;
    })
    .catch(error => {
      catchResponseError(error);
    });
};

export const signUp = ({ name, email, password, passwordConfirm }: SignUpRequest) => {
  return axios
    .post(`${API_ROOT}/auth/signup`, {
      name,
      email,
      password,
      passwordConfirm,
    })
    .then((response: AxiosResponse<SignUpResponse>) => {
      return response.data.token;
    })
    .catch(error => {
      catchResponseError(error);
    });
};
