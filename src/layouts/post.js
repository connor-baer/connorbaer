import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { values } from 'lodash/fp';
import { MDXProvider } from '@mdx-js/tag';
import { Grid, Row, Col, Heading, sharedPropTypes } from '@sumup/circuit-ui';

import { IMAGES_PATH, BLOG_PATH } from '../constants/paths';
import * as CATEGORIES from '../constants/categories';
import { BASE_URL, THEMES } from '../constants';
import { getAllCookies } from '../utils/cookies';
import Meta from '../components/Meta';
import components, { Paragraph } from './_components';
import Intro from '../components/Intro';
import PostMeta from '../components/blog/PostMeta';
import ParallaxImage from '../components/blog/ParallaxImage';

const styledParagraphStyles = ({ theme }) => css`
  font-family: ${theme.fontStack.serif};
`;

const StyledParagraph = styled(Paragraph)(styledParagraphStyles);

const postHeaderStyles = ({ theme }) => css`
  display: block;
  margin-top: ${theme.spacings.zetta};
  margin-bottom: ${theme.spacings.exa};
`;

const PostHeader = styled('header')(postHeaderStyles);

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
    return { cookies };
  }

  constructor(props) {
    super(props);
    props.theme.setTheme(THEMES.BLOG);
  }

  render() {
    const { children, title, description, slug, date, category } = this.props;
    const postPath = `${BLOG_PATH}/${slug}`;
    const file = `${IMAGES_PATH}${postPath}/cover`;
    const image = `${BASE_URL}${IMAGES_PATH}${postPath}/social.jpg`;
    const url = `${BASE_URL}${postPath}`;

    return (
      <article>
        <Meta title={title} description={description} url={url} image={image} />
        <ParallaxImage file={file} alt="REPLACE ME" />
        <Grid>
          <Row>
            <Col
              span={{ default: 12, mega: 10, tera: 8 }}
              skip={{ default: 0, mega: 1, tera: 2 }}
            >
              <PostHeader>
                <Heading element="h1" size={Heading.ZETTA} noMargin>
                  {title}
                </Heading>
                <PostMeta date={date} category={category} />
              </PostHeader>
              <Intro>{description}</Intro>
              <MDXProvider components={{ ...components, p: StyledParagraph }}>
                {children}
              </MDXProvider>
            </Col>
          </Row>
        </Grid>
      </article>
    );
  }
}

export default withTheme(Post);
