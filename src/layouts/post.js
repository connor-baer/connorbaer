import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { values } from 'lodash/fp';
import { MDXProvider } from '@mdx-js/tag';
import { Grid, Row, Col, Heading, sharedPropTypes } from '@sumup/circuit-ui';
import {
  Meta,
  Navigation,
  Main,
  Prefooter,
  Footer,
  Intro,
  ParallaxImage,
  sharedPropTypes as bambooPropTypes
} from '@madebyconnor/bamboo-ui';

import components, { Paragraph } from './_components';
import PostMeta from '../components/blog/PostMeta';

import * as CATEGORIES from '../constants/categories';
import { SITE_NAME, SITE_TWITTER, NAV_LINKS } from '../constants';
import { BLOG_PATH, BASE_URL } from '../constants/paths';

const styledParagraphStyles = ({ theme }) => css`
  font-family: ${theme.fontStack.serif};
`;

const StyledParagraph = styled(Paragraph)(styledParagraphStyles);

const styledParallaxImageStyles = ({ theme }) => css`
  height: 180px;

  ${theme.mq.kilo`
    height: 240px;
  `};

  ${theme.mq.mega`
    height: 300px;
  `};

  ${theme.mq.tera`
    height: 360px;
  `};
`;

const StyledParallaxImage = styled(ParallaxImage)(styledParallaxImageStyles);

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
    image: PropTypes.shape(bambooPropTypes.imagePropType),
    category: PropTypes.oneOf(values(CATEGORIES)),
    children: sharedPropTypes.childrenPropType,
    setTheme: PropTypes.func
  };

  constructor(props) {
    super(props);
    props.theme.setTheme('blog');
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
    const url = `${BASE_URL}${BLOG_PATH}/${slug}`;

    return (
      <>
        <Meta
          title={title}
          description={description}
          url={url}
          image={image}
          siteName={SITE_NAME}
          siteTwitter={SITE_TWITTER}
        />
        <Navigation siteName={SITE_NAME} siteUrl={BASE_URL} links={NAV_LINKS} />
        <Main>
          <article>
            <StyledParallaxImage {...image} />
            <Grid>
              <Row>
                <Col
                  span={{ default: 12, mega: 10, afterTera: 8 }}
                  skip={{ default: 0, mega: 1, afterTera: 2 }}
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
        <Prefooter
          text={'Let’s be friends.'}
          linkLabel={'Say hi!'}
          linkUrl={`https://twitter.com/${SITE_TWITTER}`}
        />
        <Footer siteName={SITE_NAME} siteTwitter={SITE_TWITTER} />
      </>
    );
  }
}

export default withTheme(Post);
