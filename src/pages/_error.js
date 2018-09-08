import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { getAllCookies } from '../utils/cookies';
import { getMetaRobots, getTitle } from '../utils/meta-helpers';
import Header from '../components/Header';

const TITLE_MAP = {
  404: 'Page not found. 🕵',
  503: 'Bear with me please. 🐻'
};

const SUBTITLE_MAP = {
  404: 'What’s worse, a hilarious 404 page can’t be found either.',
  503: ''
};

export default class Error extends Component {
  static propTypes = {
    title: PropTypes.string,
    statusCode: PropTypes.number
  };

  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx);
    const { res, err } = ctx;
    const statusCode =
      (res && res.statusCode) || (err && err.statusCode) || 500;
    return { cookies, statusCode };
  }

  render() {
    const { statusCode } = this.props;
    const title = TITLE_MAP[statusCode];
    const subtitle = SUBTITLE_MAP[statusCode];
    return (
      <Fragment>
        <Head>
          {getTitle(title)}
          {getMetaRobots()}
        </Head>
        <Header title={title} subtitle={subtitle} />
      </Fragment>
    );
  }
}
