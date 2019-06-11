import { Component } from 'react';
import Layout from '../src/components/Layout/Layout';
import { getAuthUser } from '../src/libs/auth';

class IndexPage extends Component {
  static async getInitialProps(context) {
    const user = await getAuthUser(context);

    return { user };
  }

  render() {
    const { user } = this.props;

    return (
      <Layout user={user}>
          <div className="container">
            Hello world
          </div>
      </Layout>
    );
  }
}

export default IndexPage;
