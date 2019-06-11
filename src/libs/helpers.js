import Router from 'next/router'
import cookie from 'cookie';

export const redirect = (context, target) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target })
    context.res.end()
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target)
  }
}

export const getUserToken = (context = {}) => {
  const token = parseCookies(context).token;

  return token;
}

function parseCookies(context = {}, options = {}) {
  let cookies;
  if (context.res && context.res.finished) {
    // When redirecting, the response is finished.
    // No point in continuing to render
    return
  }

  if (context && context.req) {
    if (context.req.headers.cookie) {
      cookies = context.req.headers.cookie;
    } else {
      cookies = "";
    }
  } else {
    cookies = document.cookie;
  }
  return cookie.parse(cookies, options);
}