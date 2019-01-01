import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { startsWith } from 'lodash/fp';

import { textMega, headingTera } from '../../styles/style-helpers';
import isServer from '../../utils/is-server';
import Link from '../Link';
import LogoIcon from '../LogoIcon';

import Moon from './svgs/moon.svg';
import MoonFull from './svgs/moon-full.svg';
import Motion from './svgs/motion.svg';
import MotionFull from './svgs/motion-full.svg';
import { SITE_NAME, NAV_LINKS } from '../../constants';
import { BASE_URL } from '../../constants/paths';

const headerBaseStyles = ({ theme }) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: ${theme.spacings.kilo};
  transition: opacity ${theme.animations.standard},
    padding ${theme.animations.standard};
  background-color: ${theme.colors.bodyBg};
  z-index: 999;

  &:hover {
    opacity: 1;
  }

  ${theme.mq.mega`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    flex-wrap: nowrap;
    padding: ${theme.spacings.giga};
  `};
`;

const headerInvisibleStyles = ({ theme, isInvisible }) =>
  isInvisible &&
  css`
    ${theme.mq.mega`
      opacity: 0;
    `};
  `;
const headerFloatingStyles = ({ theme, isFloating }) =>
  isFloating &&
  css`
    ${theme.mq.mega`
      padding: ${theme.spacings.kilo} ${theme.spacings.giga};
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    `};
  `;

const Header = styled('header')(
  headerBaseStyles,
  headerInvisibleStyles,
  headerFloatingStyles
);

const siteNameStyles = ({ theme }) => css`
  ${headingTera({ theme })};
  display: inline-block;
  transition: color ${theme.animations.micro};
  font-weight: ${theme.fontWeight.bold};
  line-height: 1;
  color: ${theme.colors.n900};
  margin-top: 3px;
  margin-left: ${theme.spacings.kilo};
  vertical-align: middle;

  a:hover > &,
  a:focus > & {
    color: ${theme.colors.p500};
  }
`;

const SiteName = styled('span')(siteNameStyles);

const navStyles = ({ theme }) => css`
  ${theme.mq.untilMega`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    order: 3;
    min-width: 100%;
  `};
`;

const Nav = styled('nav')(navStyles);

const navAnchorBaseStyles = ({ theme }) => css`
  ${textMega({ theme })};
  font-weight: ${theme.fontWeight.regular};
  line-height: 1;
  letter-spacing: 1px;
  display: inline-block;
  color: ${theme.colors.n700};
  border-radius: 20px;
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  margin-top: ${theme.spacings.kilo};

  ${theme.mq.mega`
    margin-right: ${theme.spacings.giga};
    margin-top: 0;
  `};

  &:last-of-type {
    margin-right: 0;
  }

  &:hover,
  &:focus {
    background-color: ${theme.colors.n100};
    color: ${theme.colors.p500};
  }
`;

const navAnchorActiveStyles = ({ theme, isActive }) =>
  isActive &&
  css`
    background-color: ${theme.colors.n100};
    font-weight: ${theme.fontWeight.bold};
  `;

const NavAnchor = styled('a')(navAnchorBaseStyles, navAnchorActiveStyles);

const iconButtonBaseStyles = ({ theme }) => css`
  display: inline-block;
  transition: fill ${theme.animations.micro},
    background-color ${theme.animations.micro};
  line-height: 0;
  border: 0;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  vertical-align: middle;
  z-index: 999;
  fill: ${theme.colors.n500};
  border-radius: 50%;
  padding: ${theme.spacings.byte};
  margin-right: ${theme.spacings.bit};

  ${theme.mq.untilMega`
    order: 2;
  `};

  &:last-of-type {
    margin-right: 0;
  }

  &:hover,
  &:focus {
    background-color: ${theme.colors.n100};
    fill: ${theme.colors.p500};
  }
`;

const iconButtonActiveStyles = ({ theme, isActive }) =>
  isActive &&
  css`
    background-color: ${theme.colors.n100};
    fill: ${theme.colors.n700};
  `;

const IconButton = styled('button')(
  iconButtonBaseStyles,
  iconButtonActiveStyles
);

class Navigation extends Component {
  static propTypes = {
    siteUrl: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    isHome: PropTypes.bool,
    links: PropTypes.array,
    router: PropTypes.object,
    theme: PropTypes.shape({
      toggleDarkmode: PropTypes.func,
      toggleReducedMotion: PropTypes.func,
      darkmode: PropTypes.bool,
      reducedMotion: PropTypes.bool
    })
  };

  static defaultProps = {
    siteName: SITE_NAME,
    siteUrl: BASE_URL,
    isHome: false,
    links: NAV_LINKS,
    router: {},
    theme: {}
  };

  state = {
    isFloating: false,
    isInvisible: false
  };

  componentDidMount() {
    if (isServer) {
      return;
    }
    this.initScrollListener();
  }

  componentWillUnmount() {
    if (isServer) {
      return;
    }
    this.removeScrollListener();
  }

  initScrollListener = () => {
    this.currentScrollY = 0;
    window.addEventListener('scroll', this.debouncedHandleScroll);
    this.listeningForScroll = true;
  };

  removeScrollListener = () => {
    if (this.listeningForScroll) {
      window.removeEventListener('scroll', this.debouncedHandleScroll);
      this.listeningForScroll = false;
    }
  };

  cancelScroll = () => {
    if (this.timeoutScroll) {
      window.cancelAnimationFrame(this.timeoutScroll);
    }
  };

  debouncedHandleScroll = () => {
    this.cancelScroll();
    this.timeoutScroll = window.requestAnimationFrame(this.handleScroll);
  };

  handleScroll = () => {
    const latestKnownScrollY = window.scrollY;
    const scrolledDown = this.currentScrollY < latestKnownScrollY;
    const isFloating = latestKnownScrollY > 44;
    const isInvisible = isFloating && scrolledDown;
    this.setState({ isFloating, isInvisible });
    this.currentScrollY = latestKnownScrollY;
  };

  render() {
    const { siteName, isHome, links, router, theme } = this.props;
    const {
      toggleDarkmode,
      toggleReducedMotion,
      darkmode,
      reducedMotion
    } = theme;

    const DarkmodeIcon = darkmode ? MoonFull : Moon;
    const MotionIcon = reducedMotion ? MotionFull : Motion;
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
      <Header {...this.state}>
        <Link href={isHome ? '#' : '/'} prefetch={!isHome}>
          <a>
            <LogoIcon alt={`Logo of '${siteName}'`} />
            <SiteName>{siteName}</SiteName>
          </a>
        </Link>

        <Nav>
          {links.map(({ url, label }, i) => (
            <Link key={i} href={url} prefetch>
              <NavAnchor isActive={startsWith(url, router.pathname)}>
                {label}
              </NavAnchor>
            </Link>
          ))}
        </Nav>

        <div>
          {toggleDarkmode && (
            <IconButton
              isActive={darkmode}
              title={`Turn ${darkmode ? 'off' : 'on'} darkmode`}
              aria-label="Darkmode"
              aria-pressed={darkmode}
              onClick={toggleDarkmode}
            >
              <DarkmodeIcon width={24} height={24} />
            </IconButton>
          )}
          {toggleReducedMotion && (
            <IconButton
              isActive={reducedMotion}
              title={`Turn ${reducedMotion ? 'off' : 'on'} reduced motion`}
              aria-label="Reduced motion"
              aria-pressed={reducedMotion}
              onClick={toggleReducedMotion}
            >
              <MotionIcon width={24} height={24} />
            </IconButton>
          )}
        </div>
      </Header>
    );
    /* eslint-enable jsx-a11y/anchor-is-valid */
  }
}

export default Navigation;
