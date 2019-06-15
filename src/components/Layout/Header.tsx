import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header } = Layout;
import { deleteTokenAndRedirect } from '../../libs/auth';

interface Props {
  pathname: string;
  userToken: UserToken;
}

interface NonAuthMenuProps {
  pathname: string;
}

interface AuthMenuProps {
  pathname: string;
  user: User;
}

interface AuthProfileMenuProps {
  pathname: string;
  user: User;
}

const signOut = () => {
  deleteTokenAndRedirect();
};

const NonAuthMenu = ({ pathname }: NonAuthMenuProps) => {
  return (
    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px', float: 'right' }} selectedKeys={[pathname]}>
      <Menu.Item key="/auth/signin">
        <Link href="/auth/signin" prefetch>
          <a href="/auth/signin">Sign In</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="/auth/signup">
        <Link href="/auth/signup" prefetch>
          <a href="/auth/signup">Sign Up</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const AuthMenu = ({ pathname }: AuthMenuProps) => {
  return (
    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px', float: 'left' }} selectedKeys={[pathname]}>
      <Menu.Item key="/dashboard">
        <Link href="/dashboard" prefetch>
          <a href="/dashboard">Dashboard</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const AuthProfileMenu = ({ pathname, user }: AuthProfileMenuProps) => {
  return (
    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px', float: 'right' }} selectedKeys={[pathname]}>
      <SubMenu
        title={
          <span>
            <Icon type="setting" />
            {user.email}
          </span>
        }
      >
        <Menu.Item key="settings">Settings</Menu.Item>
        <Menu.Item key="logout">
          <a href="" onClick={signOut}>
            Logout
          </a>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default ({ pathname, userToken }: Props) => (
  <Header className="header">
    <Link href="/" prefetch>
      <a href="/">
        <div
          className="logo"
          style={{
            width: '120px',
            height: '31px',
            background: 'rgba(255,255,255,.2)',
            margin: '16px 24px 16px 0',
            float: 'left',
          }}
        />
      </a>
    </Link>
    {!userToken.user && <NonAuthMenu pathname={pathname} />}
    {userToken.user && (
      <>
        <AuthMenu pathname={pathname} user={userToken.user} />
        <AuthProfileMenu pathname={pathname} user={userToken.user} />
      </>
    )}
  </Header>
);
