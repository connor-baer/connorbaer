import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import { LANG, GA_TOKEN } from '../constants';
import { FAVICONS_PATH, STATIC_URL } from '../constants/paths';

export default class CustomDocument extends Document {
  constructor(props) {
    super(props);
    const { __NEXT_DATA__ } = props;
    if (global.publicConfig) {
      __NEXT_DATA__.publicConfig = global.publicConfig;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <html lang={LANG}>
        <Head>
          <link rel="dns-prefetch" href={STATIC_URL} />
          <link
            rel="shortcut icon"
            href={`${FAVICONS_PATH}/favicon.ico`}
            type="image/x-icon"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${FAVICONS_PATH}/favicon.png`}
          />
          <link
            rel="apple-touch-icon"
            href={`${FAVICONS_PATH}/apple-touch-icon.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href={`${FAVICONS_PATH}/apple-touch-icon-57x57.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href={`${FAVICONS_PATH}/apple-touch-icon-72x72.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={`${FAVICONS_PATH}/apple-touch-icon-76x76.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href={`${FAVICONS_PATH}/apple-touch-icon-114x114.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={`${FAVICONS_PATH}/apple-touch-icon-120x120.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={`${FAVICONS_PATH}/apple-touch-icon-144x144.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={`${FAVICONS_PATH}/apple-touch-icon-152x152.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${FAVICONS_PATH}/apple-touch-icon-180x180.png`}
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TOKEN}`}
          />
          <script
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line max-len
              __html: `window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', '${GA_TOKEN}');`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
