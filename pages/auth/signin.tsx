import React from 'react';
import { getAuthUserTokenAndRedirectIfAuth } from '../../src/libs/auth';
import SignIn from '../../src/components/Auth/SignIn';
import { NextContext } from 'next';

interface Props {
  userToken: UserToken;
}

export default class SignInPage extends React.Component<Props> {
  public static async getInitialProps(context: NextContext) {
    const userToken = await getAuthUserTokenAndRedirectIfAuth(context);

    return { userToken };
  }

  public render() {
    return <SignIn />;
  }
}
