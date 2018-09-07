import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { getAllCookies } from '../utils/cookies';
import { getMetaRobots, getTitle } from '../utils/meta-helpers';

export default class Page extends Component {
  static propTypes = {
    toggleTheme: PropTypes.func,
    title: PropTypes.string
  };

  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx);
    return { cookies };
  }

  render() {
    const { title, toggleTheme } = this.props;
    return (
      <Fragment>
        <Head>
          {getTitle(title)}
          {getMetaRobots()}
        </Head>
        <Fragment>
          <h1>Hello</h1>
          <button onClick={toggleTheme}>Switch theme</button>
        </Fragment>
      </Fragment>
    );
  }
}
