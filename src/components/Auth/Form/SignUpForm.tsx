import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { signUp } from '../../../services/api/auth';
import { setTokenAndRedirect } from '../../../libs/auth';
import { Formik, FormikActions, FormikProps } from 'formik';

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default () => (
  <Formik
    initialValues={{ name: '', email: '', password: '', passwordConfirm: '' }}
    validate={(values: FormValues) => {
      let errors: any = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.name) {
        errors.name = 'Required';
      }

      if (!values.password) {
        errors.password = 'Required';
      }

      if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Required';
      }

      if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Password does not match';
      }

      return errors;
    }}
    onSubmit={(values: FormValues, { setSubmitting }: FormikActions<FormValues>) => {
      signUp({
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      }).then(token => {
        setTokenAndRedirect(token);
      });

      setSubmitting(false);
    }}
  >
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }: FormikProps<FormValues>) => (
      <form onSubmit={handleSubmit}>
        <Form.Item
          hasFeedback
          validateStatus={errors.name && touched.name ? 'error' : undefined}
          help={errors.name && touched.name && errors.name}
        >
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Name"
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          validateStatus={errors.email && touched.email ? 'error' : undefined}
          help={errors.email && touched.email && errors.email}
        >
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="E-Mail"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          validateStatus={errors.password && touched.password ? 'error' : undefined}
          help={errors.password && touched.password && errors.password}
        >
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          validateStatus={errors.passwordConfirm && touched.passwordConfirm ? 'error' : undefined}
          help={errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm}
        >
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password confirm"
            name="passwordConfirm"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.passwordConfirm}
          />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" className="login-form-button" disabled={isSubmitting}>
            Register
          </Button>
        </Form.Item>
      </form>
    )}
  </Formik>
);
