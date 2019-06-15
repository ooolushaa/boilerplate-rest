import React from 'react';
import { getAuthUserToken } from '../src/libs/auth';
import { NextContext } from 'next';

interface Props {
  userToken: UserToken;
}

export default class IndexPage extends React.Component<Props> {
  public static async getInitialProps(context: NextContext) {
    const userToken = await getAuthUserToken(context);

    return { userToken };
  }

  public render() {
    return <div className="container">Hello world</div>;
  }
}
