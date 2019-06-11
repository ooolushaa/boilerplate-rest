import axios from "axios/index";
import {API_ROOT} from "../../config/config";
import {showBackendErrorNotificationTitle} from "../api";


// Server side function
export async function getUser () {
  try {
    const response = await axios.get(`${API_ROOT}/user`);

    return response.data.user;
  } catch (err) {
    return null;
  }
};

export async function getUserMedias () {
  try {
    const response = await axios.get(`${API_ROOT}/user/medias`);

    return response.data.medias;
  } catch (err) {
    Object.keys(err.response.data.errors).map(key => {
      err.response.data.errors[key].map(title => {
        showBackendErrorNotificationTitle(title);
      })
    })
    throw err;
  }
};