import React from 'react';
import { withRouter } from 'next/router'
import {Layout} from 'antd';
import Meta from './Meta';
import Header from './Header';
import Footer from './Footer';
import {setAxiosSettings} from "../../services/api";

const LayoutContext = React.createContext();

class LayoutProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };
  }

  render() {
    return <LayoutContext.Provider value={this.state}>{this.props.children}</LayoutContext.Provider>
  }
}

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    setAxiosSettings(this.props.user.token);
  }

  render() {
    const { user, router } = this.props;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Meta/>
        <LayoutProvider user={user}>
          <LayoutContext.Consumer>
            {store => (
              <Header pathname={router.pathname} store={store}/>
            )}
          </LayoutContext.Consumer>
        </LayoutProvider>
        <Layout.Content style={{ padding: '50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Layout.Content>
        <Footer/>
      </Layout>
    )
  }
}

export default withRouter(AppLayout);