import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { getAllCookies } from '../utils/cookies';
import { getMetaRobots, getTitle } from '../utils/meta-helpers';
import Link from '../components/Link';

export default class Page extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx);
    return { cookies };
  }

  render() {
    const { title } = this.props;
    return (
      <Fragment>
        <Head>
          {getTitle(title)}
          {getMetaRobots()}
        </Head>
        <Fragment>
          <h1>Hello</h1>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Fragment>
      </Fragment>
    );
  }
}
