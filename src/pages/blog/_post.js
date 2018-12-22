import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { Grid, Row, Col, Heading, sharedPropTypes } from '@sumup/circuit-ui';

import { getAllCookies } from '../../utils/cookies';
import * as Contentful from '../../api/contentful';

import Meta from '../../components/Meta';
import Intro from '../../components/Intro';
import Figure from '../../components/blog/Figure';
import RichText from '../../components/RichText';
import PostMeta from '../../components/blog/PostMeta';
import ParallaxImage from '../../components/blog/ParallaxImage';
import components, { Paragraph } from '../../layouts/_components';

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

export default class Page extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static getInitialProps(ctx) {
    return Promise.all([
      getAllCookies(ctx),
      Contentful.getEntries({
        locale: 'en-US',
        content_type: 'blogPost',
        'fields.slug': ctx.req.pathname,
        include: 3
      })
    ]).then(([cookies, entries]) => ({ cookies, ...entries[0].fields }));
  }

  render() {
    const {
      title,
      description,
      heroImage,
      body,
      publishDate,
      category
    } = this.props;
    const url = '';
    const image = heroImage && `https:${heroImage.fields.file.url}`;
    const alt = heroImage && heroImage.fields.description;
    return (
      <article>
        <Meta title={title} description={description} url={url} image={image} />
        <ParallaxImage src={image} alt={alt} />
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
                <PostMeta date={publishDate} category={category} />
              </PostHeader>
              <Intro>{description}</Intro>
              {body && (
                <RichText
                  blocks={{
                    ...components,
                    p: StyledParagraph,
                    blogImage: Figure
                  }}
                  inlines={components}
                >
                  {body}
                </RichText>
              )}
            </Col>
          </Row>
        </Grid>
      </article>
    );
  }
}
