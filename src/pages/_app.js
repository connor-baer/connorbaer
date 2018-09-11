import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { get, values } from 'lodash/fp';
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

const themeIdsMap = {
  standard: THEMES.STANDARD,
  blog: THEMES.BLOG
};

export default class CustomApp extends App {
  constructor(props) {
    super(props);

    const cookies = get(['pageProps', 'cookies'], props) || {};
    const section = this.props.router.pathname.split('/')[1];
    const themeId = themeIdsMap[section] || themeIdsMap.standard;
    const darkmode = cookies.darkmode === 'true' || false;
    const reducedMotion = cookies.reducedMotion === 'true' || false;
    const theme = this.getTheme({ themeId, darkmode, reducedMotion });
    const custom = globalStyles({ theme });
    injectGlobalStyles({ theme, custom });
    loadFonts(theme.fonts);

    this.state = {
      themeId,
      darkmode,
      reducedMotion,
      isTransitioning: false
    };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  }

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

  toggleState = key => () => {
    const value = !this.state[key];
    setCookie(key, value);
    return this.animateStateChange({ [key]: value });
  };

  toggleDarkmode = this.toggleState('darkmode');

  toggleReducedMotion = this.toggleState('reducedMotion');

  render() {
    const { Component, pageProps } = this.props;
    const { darkmode, reducedMotion, isTransitioning } = this.state;
    const theme = {
      ...this.getTheme(this.state),
      setTheme: this.setTheme
    };
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
        <Head>
          <meta name="theme-color" content={theme.colors.bodyBg} />
        </Head>
        <ThemeProvider theme={theme}>
          <ThemeTransition isTransitioning={isTransitioning}>
            <Navigation
              siteName={siteName}
              siteUrl={siteUrl}
              toggleDarkmode={this.toggleDarkmode}
              toggleReducedMotion={this.toggleReducedMotion}
              darkmode={darkmode}
              reducedMotion={reducedMotion}
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
