import { Component } from 'react';
import Layout from '../src/components/Layout/Layout';
import { getAuthUser } from '../src/libs/auth';
import {redirect} from "../src/libs/helpers";

class DashboardPage extends Component {
  static async getInitialProps(context) {
    const user = await getAuthUser(context);

    if (!user.user) {
      redirect(context, '/auth/signin');
    }

    return { user };
  }

  render() {
    const { user } = this.props;

    return (
      <Layout user={user}>
        <div className="container">
          Dashboard
        </div>
      </Layout>
    );
  }
}

export default DashboardPage;
