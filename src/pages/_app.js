import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import { get } from 'lodash/fp';
import NProgress from 'nprogress';
import styled, { css, hydrate } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import { injectGlobalStyles } from '@sumup/circuit-ui';

import isServer from '../utils/is-server';
import { setCookie } from '../utils/cookies';
import globalStyles from '../styles/global-styles';
import loadFonts from '../styles/load-fonts';
import * as Themes from '../styles/themes';

import { THEMES, SITE_NAME, SITE_TWITTER, BASE_URL } from '../constants';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import Main from '../components/Main';

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
        border-color 0.2s ease-out !important;
    }
  `;

const ThemeTransition = styled('div')(transitionStyles);

export default class CustomApp extends App {
  constructor(props) {
    super(props);
    const savedThemeId = get(['pageProps', 'cookies', 'themeId'], props);
    const themeId =
      savedThemeId && Themes[savedThemeId] ? savedThemeId : THEMES.DARK;
    const theme = Themes[themeId];
    const custom = globalStyles({ theme });
    injectGlobalStyles({ theme, custom });
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
        // Wait for transition animation to finish
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
    const siteName = SITE_NAME;
    const siteTwitter = SITE_TWITTER;
    const siteUrl = BASE_URL;
    const links = [
      { url: '/about', label: 'About' },
      { url: '/work', label: 'Work' },
      { url: '/blog', label: 'Blog' }
    ];
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <ThemeTransition isTransitioning={isTransitioning}>
            <Navigation
              siteName={siteName}
              siteUrl={siteUrl}
              toggleTheme={this.toggleTheme}
              links={links}
            />
            <Main>
              <Component {...pageProps} setTheme={this.setTheme} />
            </Main>
            <Prefooter
              text="Let’s be friends."
              linkLabel="Say hi!"
              linkUrl="/"
            />
            <Footer siteName={siteName} siteTwitter={siteTwitter} />
          </ThemeTransition>
        </ThemeProvider>
      </Container>
    );
  }
}
