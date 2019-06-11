import axios from "axios/index";
import {API_ROOT} from "../../config/config";
import {showBackendErrorNotification, showBackendErrorNotificationTitle} from "../api";

export const signIn = ({ email, password }) => {
  return axios.post(`${API_ROOT}/auth/signin`, { email, password }).then(response => {
    return response.data.token;
  }).catch(err => {
    Object.keys(err.response.data.errors).map(key => {
      err.response.data.errors[key].map(title => {
        showBackendErrorNotificationTitle(title);
      })
    })
    throw err;
  });
};

export const signUp = ({
  name,
  surname,
  mobile,
  email,
  password,
  password_confirmation,
  type,
  company_name,
  position,
  web,
  city
}) => {
  return axios.post(`${API_ROOT}/auth/signup`, {
    name,
    surname,
    mobile,
    email,
    password,
    password_confirmation,
    type,
    company_name,
    position,
    web,
    city
  }).then(response => {
    return response.data.token;
  }).catch(err => {
    Object.keys(err.response.data.errors).map(key => {
      err.response.data.errors[key].map(title => {
        showBackendErrorNotificationTitle(title);
      })
    })
    throw err;
  });
};