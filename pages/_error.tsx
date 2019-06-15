import React from 'react';
import { getAuthUserToken } from '../src/libs/auth';
import { NextContext } from 'next';

interface Props {
  userToken: UserToken;
  error?: string;
}

class Error extends React.Component<Props> {
  public static async getInitialProps(context: NextContext) {
    const error = context.res ? context.res.statusCode : context.err ? context.err.message : null;
    const userToken = await getAuthUserToken(context);

    return { error, userToken };
  }

  public render() {
    return (
      <p>{this.props.error ? `An error ${this.props.error} occurred on server` : 'An error occurred on client'}</p>
    );
  }
}

export default Error;
