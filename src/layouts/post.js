import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { values } from 'lodash/fp';
import { MDXProvider } from '@mdx-js/tag';
import { Grid, Row, Col, Heading, sharedPropTypes } from '@sumup/circuit-ui';

import components, { Paragraph } from './_components';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Main from '../components/Main';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import Intro from '../components/Intro';
import PostMeta from '../components/blog/PostMeta';
import ParallaxImage from '../components/images/ParallaxImage';

import CONFIG from '../config';
import { BLOG_PATH } from '../constants/paths';
import { THEMES } from '../constants';
import * as CATEGORIES from '../constants/categories';

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

  constructor(props) {
    super(props);
    props.theme.setTheme(THEMES.BLOG);
  }

  render() {
    const {
      children,
      title,
      description,
      image,
      slug,
      date,
      category
    } = this.props;
    const postPath = `${BLOG_PATH}/${slug}`;
    const url = `${CONFIG.BASE_URL}${postPath}`;

    return (
      <>
        <Meta title={title} description={description} url={url} image={image} />
        <Navigation />
        <Main>
          <article>
            <ParallaxImage {...image} />
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
                  <MDXProvider
                    components={{ ...components, p: StyledParagraph }}
                  >
                    {children}
                  </MDXProvider>
                </Col>
              </Row>
            </Grid>
          </article>
        </Main>
        <Prefooter />
        <Footer />
      </>
    );
  }
}

export default withTheme(Post);
