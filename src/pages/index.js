import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import { getAllCookies } from '../utils/cookies';
import { getMetaRobots, getTitle } from '../utils/meta-helpers';
import Header from '../components/Header';

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
          <Header title="Hello, I’m Connor." subtitle="I am a web developer with a strong background in design and a passion for accessibility, currently working as a Frontend Engineer at SumUp." />
        </Fragment>
      </Fragment>
    );
  }
}
