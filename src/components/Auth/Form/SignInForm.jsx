import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import {signIn} from "../../../services/api/auth";
import {setTokenAndRedirect} from "../../../libs/auth";
const FormItem = Form.Item;

class NormalSignInForm extends React.Component {
  state = {
    loading: false,
  }

  handleSubmit = (e) => {
    this.setState({
      loading: true,
    })
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        signIn({ email: values.email, password: values.password }).then(token => {
          setTokenAndRedirect(token);
        }).catch(err => {
          this.setState({
            loading: false,
          })
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-Mail" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }} loading={this.state.loading}>
            Log in
          </Button>
          <a className="login-form-forgot" href="">Forgot password</a>
        </FormItem>
      </Form>
    );
  }
}

const SignInForm = Form.create()(NormalSignInForm);

export default SignInForm;
