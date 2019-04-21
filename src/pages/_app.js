import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import { Theme, NProgress } from '@madebyconnor/bamboo-ui';

import { getAllCookies } from '../services/cookies';
import * as themes from '../styles/themes';

import { FONTS_PATH } from '../constants/paths';

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = getAllCookies(ctx);
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps, cookies };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    Router.events.on('routeChangeComplete', () => {
      objectFitPolyfill();
    });
  }

  render() {
    const { Component, pageProps, cookies, router } = this.props;
    const section = router.pathname.split('/')[1];
    return (
      <Container>
        <Theme
          cookies={cookies}
          themes={themes}
          initialThemeId={section}
          assetPrefix={FONTS_PATH}
        >
          <NProgress />
          <Component {...pageProps} cookies={cookies} />
        </Theme>
      </Container>
    );
  }
}
