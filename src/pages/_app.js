import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { values } from 'lodash/fp';
import NProgress from 'nprogress';
import styled, { css, hydrate } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import { injectGlobalStyles } from '@sumup/circuit-ui';

import isServer from '../utils/is-server';
import { getAllCookies, setCookie } from '../services/cookies';
import globalStyles from '../styles/global-styles';
import loadFonts, { preloadFonts } from '../styles/load-fonts';
import * as Themes from '../styles/themes';

import { THEMES } from '../constants';
import isSaveData from '../utils/is-save-data';

// Adds server generated styles to emotion cache.
if (!isServer) {
  // eslint-disable-next-line no-underscore-dangle
  hydrate(window.__NEXT_DATA__.emotionIds);
}

const transitionStyles = ({ theme, isTransitioning }) =>
  isTransitioning &&
  css`
    * {
      transition: background-color ${theme.animations.micro},
        color ${theme.animations.micro}, fill ${theme.animations.micro},
        border-color ${theme.animations.micro} !important;
    }
  `;

const ThemeTransition = styled('div')(transitionStyles);

const themeIdsMap = {
  standard: THEMES.STANDARD,
  blog: THEMES.BLOG
};

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = getAllCookies(ctx);
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { Component, pageProps, cookies };
  }

  constructor(props) {
    super(props);

    const { cookies = {} } = props;
    const section = this.props.router.pathname.split('/')[1];
    const themeId = themeIdsMap[section] || themeIdsMap.standard;
    const darkmode = cookies.darkmode === 'true';
    const reducedMotion = cookies.reducedMotion === 'true';
    const theme = this.getTheme({ themeId, darkmode, reducedMotion });
    const custom = globalStyles({ theme });
    injectGlobalStyles({ theme, custom });

    if (!isSaveData) {
      loadFonts(theme.fonts);
    }

    this.state = {
      themeId,
      darkmode,
      reducedMotion,
      isTransitioning: false
    };
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => {
      NProgress.done();
      objectFitPolyfill();
    });
    Router.events.on('routeChangeError', () => NProgress.done());

    if (isServer) {
      return;
    }

    this.motionQuery = window.matchMedia('(prefers-reduced-motion)');
    this.motionQuery.addListener(this.handleReducedMotionChange);

    if (this.motionQuery.matches) {
      setCookie('reducedMotion', true);
      this.setState({ reducedMotion: true });
    }

    this.colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.colorSchemeQuery.addListener(this.handleColorSchemeChange);

    if (this.colorSchemeQuery.matches) {
      setCookie('darkmode', true);
      this.setState({ darkmode: true });
    }
  }

  componentWillUnmount() {
    this.motionQuery.removeListener(this.handleReducedMotionChange);
    this.colorSchemeQuery.removeListener(this.handleColorSchemeChange);
  }

  handleReducedMotionChange = () => {
    const reducedMotion = this.motionQuery.matches;
    setCookie('reducedMotion', reducedMotion);
    this.animateStateChange({ reducedMotion });
  };

  handleColorSchemeChange = () => {
    const darkmode = this.colorSchemeQuery.matches;
    setCookie('darkmode', darkmode);
    this.animateStateChange({ darkmode });
  };

  getTheme = ({ themeId, darkmode, reducedMotion }) =>
    Themes[themeId]({ darkmode, reducedMotion });

  setTheme = themeId =>
    new Promise((resolve, reject) => {
      if (themeId === this.state.themeId) {
        resolve();
        return;
      }
      if (!values(THEMES).includes(themeId)) {
        reject();
        return;
      }
      this.animateStateChange({ themeId }).then(() => resolve());
    });

  animateStateChange = newState =>
    new Promise(resolve => {
      this.setState({ ...newState, isTransitioning: true }, () => {
        // Wait for transition animation to finish
        setTimeout(() => {
          this.setState({ isTransitioning: false });
          resolve();
        }, 200);
      });
    });

  toggleState = key => () => {
    const value = !this.state[key];
    setCookie(key, value);
    return this.animateStateChange({ [key]: value });
  };

  toggleDarkmode = this.toggleState('darkmode');

  toggleReducedMotion = this.toggleState('reducedMotion');

  render() {
    const { Component, pageProps, cookies } = this.props;
    const { darkmode, reducedMotion, isTransitioning } = this.state;
    const theme = {
      ...this.getTheme(this.state),
      setTheme: this.setTheme,
      toggleDarkmode: this.toggleDarkmode,
      toggleReducedMotion: this.toggleReducedMotion,
      darkmode,
      reducedMotion
    };
    return (
      <Container>
        <Head>
          <meta name="theme-color" content={theme.colors.bodyBg} />
          {preloadFonts(theme.fonts)}
        </Head>
        <ThemeProvider theme={theme}>
          <ThemeTransition isTransitioning={isTransitioning}>
            <Component
              {...pageProps}
              cookies={cookies}
              setTheme={this.setTheme}
            />
          </ThemeTransition>
        </ThemeProvider>
      </Container>
    );
  }
}
