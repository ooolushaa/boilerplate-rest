import { Fragment } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import {STATIC_ROOT} from "../../config/config";
import styles from 'antd/dist/antd.min.css';
import npstyles from 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Meta = () => (
  <Fragment>
    <Head>
      <title>Media</title>
      <meta name="description" content="" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no" />

      <link rel="shortcut icon" href="/static/images/favicon.ico" />

      <style dangerouslySetInnerHTML={{ __html: styles}} />
      <style dangerouslySetInnerHTML={{ __html: npstyles}} />
    </Head>
  </Fragment>
);

export default Meta;
