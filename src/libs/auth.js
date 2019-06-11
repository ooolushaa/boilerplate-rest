import cookie from 'cookie';
import {getUserToken, redirect} from './helpers';
import {setAxiosSettings} from "../services/api";
import {getUser} from "../services/api/user";

export async function getAuthUser (context = {}) {
  if (context.res && context.res.finished) {
    // When redirecting, the response is finished.
    // No point in continuing to render
    return
  }

  const token = getUserToken(context);
  setAxiosSettings(token);

  const user = await getUser();

  return {
    user,
    token
  };
}

export const deleteTokenAndRedirect = () => {
  document.cookie = cookie.serialize('token', '', {
    maxAge: -1 // Expire the cookie immediately
  })

  redirect({}, "/");
};

export const setTokenAndRedirect = (token) => {
  document.cookie = cookie.serialize('token', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/'
  })

  redirect({}, '/dashboard')
};