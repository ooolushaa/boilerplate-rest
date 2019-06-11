import React from 'react';
import { Row, Col } from 'antd';
import SignUpForm from './Form/SignUpForm';

class SignUp extends React.Component {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col span="6">
          <SignUpForm />
        </Col>
      </Row>
    );
  }
}

export default SignUp;