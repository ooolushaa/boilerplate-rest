import React from 'react';
import { getAuthUserTokenAndRedirectIfAuth } from '../../src/libs/auth';
import SignUp from '../../src/components/Auth/SignUp';
import { NextContext } from 'next';

interface Props {
  userToken: UserToken;
}

export default class SignUpPage extends React.Component<Props> {
  public static async getInitialProps(context: NextContext) {
    const userToken = await getAuthUserTokenAndRedirectIfAuth(context);

    return { userToken };
  }

  public render() {
    return <SignUp />;
  }
}
