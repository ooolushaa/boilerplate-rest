import {Component} from "react";
import Link from "next/link";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu, ItemGroup } = Menu;
const { Header, Content, Sider } = Layout;
import {deleteTokenAndRedirect} from "../../libs/auth";

const signOut = () => {
  deleteTokenAndRedirect();
};

const NonAuthMenu = ({ pathname }) => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '64px', float: 'right' }}
      selectedKeys={[pathname]}
    >
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
  )
}

const AuthMenu = ({ pathname, user }) => {
  return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px', float: 'left' }}
        selectedKeys={[pathname]}
      >
        <Menu.Item key="/dashboard">
          <Link href="/dashboard" prefetch>
            <a href="/dashboard">Dashboard</a>
          </Link>
        </Menu.Item>
      </Menu>
  )
}

const AuthProfileMenu = ({ pathname, user }) => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '64px', float: 'right' }}
      selectedKeys={[pathname]}
    >
      <SubMenu title={<span><Icon type="setting" />{user.email}</span>}>
        <Menu.Item key="settings">Settings</Menu.Item>
        <Menu.Item key="logout">
          <a href="" onClick={signOut}>
            Logout
          </a>
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}

class PageHeader extends Component {
  render() {
    const {user} = this.props.store;

    return (
      <Header className="header">
        <Link href="/" prefetch>
          <a href="/">
            <div className="logo" style={{ width: '120px', height: '31px', background: 'rgba(255,255,255,.2)', margin: '16px 24px 16px 0', float: 'left' }}></div>
          </a>
        </Link>
        {!user.user && (
          <NonAuthMenu pathname={this.props.pathname} />
        )}
        {user.user && (
          <>
            <AuthMenu pathname={this.props.pathname} user={user.user} />
            <AuthProfileMenu pathname={this.props.pathname} user={user.user} />
          </>
        )}
      </Header>
    )
  }
}

export default PageHeader;
