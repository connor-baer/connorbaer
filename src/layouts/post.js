import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/tag';
import { Grid, Row, Col, Heading, Text } from '@sumup/circuit-ui';

import { IMAGES_PATH, BLOG_PATH } from '../constants/paths';
import { getAllCookies } from '../utils/cookies';
import Meta from '../components/Meta';
import components from './_components';
import Image from '../components/Image';

export default class Post extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    date: PropTypes.string
  };

  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx);
    return { cookies };
  }

  render() {
    const { children, title, description, slug, date } = this.props;
    const postPath = `${BLOG_PATH}/${slug}`;
    const file = `${IMAGES_PATH}${postPath}/cover`;

    return (
      <Fragment>
        <Meta title={title} description={description} />
        <Image file={file} style={{ maxWidth: '100vw', width: '100%' }} />
        <Grid>
          <Row>
            <Col
              span={{ default: 12, mega: 10, tera: 8 }}
              skip={{ default: 0, mega: 1, tera: 2 }}
            >
              <Heading element="h1" size={Heading.ZETTA}>
                {title}
              </Heading>
              <Text size={Text.KILO}>{date}</Text>
              <Text size={Text.GIGA}>{description}</Text>
              <MDXProvider components={components}>{children}</MDXProvider>
            </Col>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}
