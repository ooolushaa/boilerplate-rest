import { showBackendErrorNotificationTitle } from '../services/api';
import { AxiosError } from 'axios';

export const catchResponseError = (error: AxiosError) => {
  if (error.response) {
    Object.keys(error.response.data.errors).map(key => {
      if (error.response && error.response.data.errors && error.response.data.errors[key]) {
        error.response.data.errors[key].map((title: string) => {
          showBackendErrorNotificationTitle(title);
        });
      }
    });
  } else {
    showBackendErrorNotificationTitle(error.toString());
  }
  throw error;
};
