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

import * as themes from '../styles/themes';
import Link from '../components/Link';
import Image from '../components/Image';

import { FONTS_PATH } from '../constants/paths';

export default class CustomApp extends App {
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
    const { Component, pageProps, router } = this.props;
    const { isLoading } = this.state;
    const section = router.pathname.split('/')[1];
    return (
      <Container>
        <ComponentsContext.Provider value={{ Head, Image, Link }}>
          <Theme
            themes={themes}
            initialThemeId={section}
            assetPrefix={FONTS_PATH}
          >
            <GlobalStyles />
            <LoadingBar isLoading={isLoading} />
            <Component {...pageProps} />
          </Theme>
        </ComponentsContext.Provider>
      </Container>
    );
  }
}
