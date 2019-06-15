import React, { ReactNode, useEffect } from 'react';
import { RouterProps, withRouter } from 'next/router';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import { setAxiosSettings } from '../../services/api';
import '../../../assets/styles.less';

interface Props {
  userToken: UserToken;
  router: RouterProps;
  children: ReactNode;
}

const AppLayout = ({ userToken, router, children }: Props) => {
  useEffect(() => {
    setAxiosSettings(userToken.token);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header pathname={router.pathname} userToken={userToken} />
      <Layout.Content style={{ padding: '50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{children}</div>
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default withRouter(AppLayout);
