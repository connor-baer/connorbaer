import React from 'react';
import PropTypes from 'prop-types';
import App, { Container } from 'next/app';
import Router from 'next/router';
import { get } from 'lodash/fp';
import NProgress from 'nprogress';
import { hydrate } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';

import isServer from '../utils/is-server';
import { setCookie } from '../utils/cookies';
import globalStyles from '../styles/global-styles';
import loadFonts from '../styles/load-fonts';
import * as Themes from '../styles/themes';

import { THEMES } from '../constants';

// Adds server generated styles to emotion cache.
if (!isServer) {
  hydrate(window.__NEXT_DATA__.emotionIds);
}

export default class CustomApp extends App {
  constructor(props) {
    super(props);
    const savedThemeId = get(['pageProps', 'cookies', 'themeId'], props);
    const themeId =
      savedThemeId && Themes[savedThemeId] ? savedThemeId : THEMES.LIGHT;
    const theme = Themes[themeId];
    globalStyles(theme);
    loadFonts(theme.fonts);

    this.state = { themeId };
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  }

  setTheme = themeId => {
    return new Promise((resolve, reject) => {
      const theme = Themes[themeId];
      if (!theme) {
        return reject();
      }
      setCookie('themeId', themeId);
      this.setState({ themeId }, () => resolve());
    });
  };

  toggleTheme = () => {
    const themeId =
      this.state.themeId === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    this.setTheme(themeId);
  };

  render() {
    const { Component, pageProps } = this.props;
    const theme = Themes[this.state.themeId];
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Component
            {...pageProps}
            setTheme={this.setTheme}
            toggleTheme={this.toggleTheme}
          />
        </ThemeProvider>
      </Container>
    );
  }
}
