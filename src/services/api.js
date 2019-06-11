import axios from 'axios';
import https from 'https';
import { notification, Icon } from 'antd';
import { API_ROOT } from '../config/config';

export const setAxiosSettings = (token) => {
  axios.defaults.baseURL = API_ROOT;
  axios.defaults.headers.Accept = 'application/json';

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // hack with backend ssl

  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    axios.defaults.headers.Authorization = '';
  }
};

export const showBackendErrorNotificationTitle = err => {
  notification.open({
    message: err,
    icon: <Icon type="frown-o" style={{ color: '#e74c3c' }} />,
  });
};

export const showBackendErrorNotification = err => {
  notification.open({
    message: 'Whoops',
    description: err,
    icon: <Icon type="frown-o" style={{ color: '#e74c3c' }} />,
  });
};

export const showSuccessNotification = message => {
  notification.open({
    message: 'Success',
    description: message,
    icon: <Icon type="smile-o" style={{ color: '#2ecc71' }} />,
  });
};