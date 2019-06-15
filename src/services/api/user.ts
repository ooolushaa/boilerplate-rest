import axios, { AxiosResponse } from 'axios/index';
import { API_ROOT } from '../../config/config';

interface GetUserResponse {
  user: UserToken;
}

// Server side function
export const getUser = async (): Promise<UserToken | null> => {
  try {
    const response: AxiosResponse<GetUserResponse> = await axios.get(`${API_ROOT}/user`);

    return response.data.user;
  } catch (err) {
    return null;
  }
};
