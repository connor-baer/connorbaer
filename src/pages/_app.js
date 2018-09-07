import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import { get } from 'lodash/fp';
import NProgress from 'nprogress';
import styled, { css, hydrate } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';

import isServer from '../utils/is-server';
import { setCookie } from '../utils/cookies';
import globalStyles from '../styles/global-styles';
import loadFonts from '../styles/load-fonts';
import * as Themes from '../styles/themes';

import { THEMES } from '../constants';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';

// Adds server generated styles to emotion cache.
if (!isServer) {
  // eslint-disable-next-line no-underscore-dangle
  hydrate(window.__NEXT_DATA__.emotionIds);
}

const transitionStyles = ({ isTransitioning }) =>
  isTransitioning &&
  css`
    * {
      transition: background-color 0.2s ease-out, color 0.2s ease-out,
        border-color 0.2s ease-out;
    }
  `;

const ThemeTransition = styled('div')(transitionStyles);

export default class CustomApp extends App {
  constructor(props) {
    super(props);
    const savedThemeId = get(['pageProps', 'cookies', 'themeId'], props);
    const themeId =
      savedThemeId && Themes[savedThemeId] ? savedThemeId : THEMES.LIGHT;
    const theme = Themes[themeId];
    globalStyles(theme);
    loadFonts(theme.fonts);

    this.state = { themeId, isTransitioning: false };
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  }

  setTheme = themeId =>
    new Promise((resolve, reject) => {
      const theme = Themes[themeId];
      if (!theme) {
        reject();
        return;
      }
      setCookie('themeId', themeId);
      this.setState({ themeId, isTransitioning: true }, () => {
        // Wait for transition to finish
        setTimeout(() => {
          this.setState({ isTransitioning: false });
          resolve();
        }, 200);
      });
    });

  toggleTheme = () => {
    const themeId =
      this.state.themeId === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    this.setTheme(themeId);
  };

  render() {
    const { Component, pageProps } = this.props;
    const { themeId, isTransitioning } = this.state;
    const theme = Themes[themeId];
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <ThemeTransition isTransitioning={isTransitioning}>
            <Main>
              <Component
                {...pageProps}
                setTheme={this.setTheme}
                toggleTheme={this.toggleTheme}
              />
            </Main>
            <Footer />
          </ThemeTransition>
        </ThemeProvider>
      </Container>
    );
  }
}
