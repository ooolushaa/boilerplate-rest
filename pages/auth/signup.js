import { Component } from 'react';
import Layout from '../../src/components/Layout/Layout';
import { getAuthUser } from '../../src/libs/auth';
import SignUp from "../../src/components/Auth/SignUp";
import {redirect} from "../../src/libs/helpers";

class SignUpPage extends Component {
  static async getInitialProps(context) {
    const user = await getAuthUser(context);

    if (user.user) {
      redirect(context, '/dashboard');
    }

    return { user };
  }

  render() {
    const { user } = this.props;

    return (
      <Layout user={user}>
        <SignUp />
      </Layout>
    );
  }
}

export default SignUpPage;
