import React from 'react';
import App, { AppProps, Container } from 'next/app';
import Layout from '../src/components/Layout/Layout';

export default class MyApp extends App<AppProps> {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
