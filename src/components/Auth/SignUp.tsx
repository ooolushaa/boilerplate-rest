import React from 'react';
import { Row, Col } from 'antd';
import SignUpForm from './Form/SignUpForm';

export default () => (
  <Row type="flex" justify="center">
    <Col span={6}>
      <SignUpForm />
    </Col>
  </Row>
);
