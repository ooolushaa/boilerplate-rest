import axios from 'axios';
import { notification, Icon } from 'antd';
import { API_ROOT } from '../config/config';

export const setAxiosSettings = (token: string | null) => {
  axios.defaults.baseURL = API_ROOT;
  axios.defaults.headers.Accept = 'application/json';

  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    axios.defaults.headers.Authorization = '';
  }
};

export const showBackendErrorNotificationTitle = (error: string) => {
  notification.open({
    message: error,
    icon: <Icon type="frown-o" style={{ color: '#e74c3c' }} />,
  });
};

export const showBackendErrorNotification = (error: string) => {
  notification.open({
    message: 'Whoops',
    description: error,
    icon: <Icon type="frown-o" style={{ color: '#e74c3c' }} />,
  });
};

export const showSuccessNotification = (message: string) => {
  notification.open({
    message: 'Success',
    description: message,
    icon: <Icon type="smile-o" style={{ color: '#2ecc71' }} />,
  });
};
