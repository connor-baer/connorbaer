import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import { getAllCookies } from '../utils/cookies';
import Meta from '../components/Meta';
import Header from '../components/Header';

const TITLE_MAP = {
  404: 'Page not found. 🕵',
  500: 'An error occured. 💩',
  503: 'Bear with me please. 🚧'
};

const SUBTITLE_MAP = {
  404: 'What’s worse, a hilarious 404 page can’t be found either.',
  500: 'Something has gone wrong. Try to refresh the page or go back to the homepage.',
  503: 'I’m currently carrying out some maintenance on my website. It will only take a minute.'
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
        <Meta title={title} description={subtitle} />
        <Grid>
          <Row>
            <Col
              span={{ default: 12, kilo: 10, mega: 8 }}
              skip={{ default: 0, kilo: 1, mega: 2 }}
            >
              <Header title={title} subtitle={subtitle} />
            </Col>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}
