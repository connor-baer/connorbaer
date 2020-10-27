import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import {
  ComponentsProvider,
  Theme,
  Align,
  LoadingBar,
  BaseStyles,
} from '@madebyconnor/bamboo-ui';

import { standard } from '../styles/themes';
import Link from '../components/Link';
import Image from '../components/Image';

export default class CustomApp extends App {
  state = {
    isLoading: false,
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
    const { Component, pageProps } = this.props;
    const { isLoading } = this.state;

    // Adapted from https://github.com/mdx-js/mdx/issues/382#issuecomment-523014913
    const theme =
      (Component.isMDXComponent
        ? Component({}).props.originalType.theme
        : Component.theme) || standard;

    return (
      <ComponentsProvider value={{ Head, Image, Link, Align }}>
        <Theme theme={theme}>
          <BaseStyles />
          <LoadingBar isLoading={isLoading} />
          <Component {...pageProps} />
        </Theme>
      </ComponentsProvider>
    );
  }
}
