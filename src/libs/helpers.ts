import Router from 'next/router';
import cookie from 'cookie';
import { NextContext } from 'next';

const parseCookies = (context: NextContext, options = {}) => {
  let cookies;
  if (context.res && context.res.finished) {
    // When redirecting, the response is finished.
    // No point in continuing to render
    return;
  }

  if (context && context.req) {
    if (context.req.headers.cookie) {
      cookies = context.req.headers.cookie;
    } else {
      cookies = '';
    }
  } else {
    cookies = document.cookie;
  }

  return cookie.parse(cookies, options);
};

export const redirect = (context: NextContext | null, target: string) => {
  if (context && context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};

export const getCookieUserToken = (context: NextContext): string | null => {
  const cookies = parseCookies(context);

  return cookies ? cookies.token : null;
};
