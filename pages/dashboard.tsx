import React from 'react';
import { getAuthUserTokenAndRedirectIfNotAuth } from '../src/libs/auth';
import { NextContext } from 'next';

interface Props {
  userToken: UserToken;
}

export default class DashboardPage extends React.Component<Props> {
  public static async getInitialProps(context: NextContext) {
    const userToken = await getAuthUserTokenAndRedirectIfNotAuth(context);

    return { userToken };
  }

  public render() {
    return <div className="container">Dashboard</div>;
  }
}
