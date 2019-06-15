import React from 'react';
import { Formik, FormikActions, FormikProps } from 'formik';
import { Form, Icon, Input, Button } from 'antd';
import { signIn } from '../../../services/api/auth';
import { setTokenAndRedirect } from '../../../libs/auth';

interface FormValues {
  email: string;
  password: string;
}

export default () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validate={(values: FormValues) => {
      let errors: any = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      return errors;
    }}
    onSubmit={(values: FormValues, { setSubmitting }: FormikActions<FormValues>) => {
      signIn({ email: values.email, password: values.password }).then(token => {
        setTokenAndRedirect(token);
      });

      setSubmitting(false);
    }}
  >
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }: FormikProps<FormValues>) => (
      <form onSubmit={handleSubmit}>
        <Form.Item
          hasFeedback
          validateStatus={errors.email && touched.email ? 'error' : undefined}
          help={errors.email && touched.email && errors.email}
        >
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
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
        <Form.Item>
          <Button block htmlType="submit" className="login-form-button" disabled={isSubmitting}>
            Sign in
          </Button>
        </Form.Item>
      </form>
    )}
  </Formik>
);
