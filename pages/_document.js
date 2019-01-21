import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="icon" type="image/x-icon" href="static/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
        </Head>
        <body className="App">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
