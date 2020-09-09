import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { LANG } from '../constants/site';

export default class CustomDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={LANG}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
