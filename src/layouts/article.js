import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/tag';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import { getAllCookies } from '../utils/cookies';
import Meta from '../components/Meta';
import Header from '../components/Header';
import components from './_components';

export default class Article extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.element
  };

  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx);
    return { cookies };
  }

  render() {
    const { children, title, subtitle } = this.props;
    return (
      <Fragment>
        <Meta title={title} description={subtitle} />
        <Grid>
          <Row>
            <Col
              span={{ default: 12, mega: 10, tera: 8 }}
              skip={{ default: 0, mega: 1, tera: 2 }}
            >
              <Header title={title} subtitle={subtitle} />
              <MDXProvider components={components}>{children}</MDXProvider>
            </Col>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}
