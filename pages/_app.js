import React from 'react';
import App from 'next/app';
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
    Router.events.on('routeChangeStart', this.startLoading);
    Router.events.on('routeChangeComplete', this.stopLoading);
    Router.events.on('routeChangeError', this.stopLoading);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading);
    Router.events.off('routeChangeComplete', this.stopLoading);
    Router.events.off('routeChangeError', this.stopLoading);
  }

  startLoading = () => {
    this.setState({ isLoading: false });
  };

  stopLoading = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { Component, pageProps, router } = this.props;
    const { isLoading } = this.state;
    const section = router.pathname.split('/')[1];
    return (
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
    );
  }
}
