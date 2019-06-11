import React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import {signUp} from "../../../services/api/auth";
import {setTokenAndRedirect} from "../../../libs/auth";
const FormItem = Form.Item;

class NormalSignUpForm extends React.Component {
  state = {
    loading: false,
    type: null,
  }

  handleSubmit = (e) => {
    this.setState({
      loading: true,
    })
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        signUp({
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        }).then(token => {
          setTokenAndRedirect(token);
        }).catch(err => {
          this.setState({
            loading: false,
          })
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={24}>
          <Col span={24}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(
                <Input className="gutter-row" placeholder="Name" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ type: "email", required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-Mail" autoComplete="username" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" autoComplete="new-password" />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator('password_confirmation', {
                rules: [{ required: true, message: 'Please input your Repeat Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password Confirmation" autoComplete="new-password" />
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }} loading={this.state.loading}>
            Sign Up
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const SignUpForm = Form.create()(NormalSignUpForm);

export default SignUpForm;
