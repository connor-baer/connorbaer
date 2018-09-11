import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { values } from 'lodash/fp';
import { MDXProvider } from '@mdx-js/tag';
import { Grid, Row, Col, Heading, sharedPropTypes } from '@sumup/circuit-ui';

import { IMAGES_PATH, BLOG_PATH } from '../constants/paths';
import * as CATEGORIES from '../constants/categories';
import { THEMES } from '../constants';
import { getAllCookies } from '../utils/cookies';
import Meta from '../components/Meta';
import components, { Paragraph } from './_components';
import Image from '../components/Image';
import PostMeta from '../components/blog/PostMeta';
import Intro from '../components/Intro/Intro';

const StyledParagraph = styled(Paragraph)(
  ({ theme }) =>
    css`
      font-family: ${theme.fontStack.serif};
    `
);

class Post extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    date: PropTypes.string,
    category: PropTypes.oneOf(values(CATEGORIES)),
    children: sharedPropTypes.childrenPropType,
    theme: sharedPropTypes.themePropType
  };

  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx);
    const themeId = THEMES.BLOG;
    return { cookies, themeId };
  }

  constructor(props) {
    super(props);
    props.theme.setTheme(THEMES.BLOG);
  }

  render() {
    const { children, title, description, slug, date, category } = this.props;
    const postPath = `${BLOG_PATH}/${slug}`;
    const file = `${IMAGES_PATH}${postPath}/cover`;

    return (
      <Fragment>
        <Meta title={title} description={description} />
        <Image
          file={file}
          alt="REPLACE ME"
          style={{ maxWidth: '100vw', width: '100%' }}
        />
        <Grid>
          <Row>
            <Col
              span={{ default: 12, mega: 10, tera: 8 }}
              skip={{ default: 0, mega: 1, tera: 2 }}
            >
              <Heading element="h1" size={Heading.ZETTA} noMargin>
                {title}
              </Heading>
              <PostMeta date={date} category={category} />
              <Intro>{description}</Intro>
              <MDXProvider components={{ ...components, p: StyledParagraph }}>
                {children}
              </MDXProvider>
            </Col>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}

export default withTheme(Post);
