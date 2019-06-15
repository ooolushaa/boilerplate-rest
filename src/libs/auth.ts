import cookie from 'cookie';
import { getCookieUserToken, redirect } from './helpers';
import { setAxiosSettings } from '../services/api';
import { getUser } from '../services/api/user';
import { NextContext } from 'next';

export const getAuthUserToken = async (context: NextContext) => {
  if (context.res && context.res.finished) {
    // When redirecting, the response is finished.
    // No point in continuing to render
    return;
  }

  const token = getCookieUserToken(context);
  setAxiosSettings(token);

  const user = await getUser();

  return {
    user,
    token,
  };
};

export const deleteTokenAndRedirect = () => {
  document.cookie = cookie.serialize('token', '', {
    maxAge: -1, // Expire the cookie immediately
  });

  redirect(null, '/');
};

export const setTokenAndRedirect = (token: string) => {
  document.cookie = cookie.serialize('token', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  });

  redirect(null, '/dashboard');
};

export async function getAuthUserTokenAndRedirectIfNotAuth(context: NextContext) {
  const user = await getAuthUserToken(context);

  if (user && !user.user) {
    redirect(null, '/auth/signin');
  }

  return user;
}

export const getAuthUserTokenAndRedirectIfAuth = async (context: NextContext) => {
  const user = await getAuthUserToken(context);

  if (user && user.user) {
    redirect(context, '/dashboard');
  }

  return user;
};
