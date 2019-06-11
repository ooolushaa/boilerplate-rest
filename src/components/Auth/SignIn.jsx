import React from 'react';
import { Row, Col } from 'antd';
import SignInForm from './Form/SignInForm';

class SignIn extends React.Component {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col span="6">
          <SignInForm />
        </Col>
      </Row>
    );
  }
}

export default SignIn;