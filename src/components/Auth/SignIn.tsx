import React from 'react';
import { Row, Col } from 'antd';
import SignInForm from './Form/SignInForm';

export default () => (
  <Row type="flex" justify="center">
    <Col span={6}>
      <SignInForm />
    </Col>
  </Row>
);
