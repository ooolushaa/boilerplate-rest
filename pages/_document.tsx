import React from 'react';
import Document, { DocumentProps, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document<DocumentProps> {
  public render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="shortcut icon" href="/static/images/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
