import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import {
  ComponentsContext,
  Theme,
  LoadingBar,
  GlobalStyles
} from '@madebyconnor/bamboo-ui';

import { getAllCookies } from '../services/cookies';
import getBaseUrl from '../utils/get-base-url';
import * as themes from '../styles/themes';
import Link from '../components/Link';
import Image from '../components/Image';

import { FONTS_PATH } from '../constants/paths';

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = getAllCookies(ctx);
    const baseUrl = getBaseUrl(ctx);
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps, cookies, baseUrl };
  }

  state = {
    isLoading: false
  };

  componentDidMount() {
    Router.events.on('routeChangeStart', () => {
      this.setState({ isLoading: true });
    });
    Router.events.on('routeChangeComplete', () => {
      this.setState({ isLoading: false });
    });
    Router.events.on('routeChangeError', () => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { Component, pageProps, cookies, baseUrl, router } = this.props;
    const { isLoading } = this.state;
    const section = router.pathname.split('/')[1];
    return (
      <Container>
        <ComponentsContext.Provider value={{ Head, Image, Link }}>
          <Theme
            cookies={cookies}
            themes={themes}
            initialThemeId={section}
            assetPrefix={FONTS_PATH}
          >
            <GlobalStyles />
            <LoadingBar isLoading={isLoading} />
            <Component {...pageProps} cookies={cookies} baseUrl={baseUrl} />
          </Theme>
        </ComponentsContext.Provider>
      </Container>
    );
  }
}
