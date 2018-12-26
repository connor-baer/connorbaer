import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import * as Posts from '../../services/posts';
import { getAllCookies } from '../../services/cookies';
import { headingZetta } from '../../styles/style-helpers';

import Meta from '../../components/Meta';
import Header from '../../components/Header';
import PreviewLarge from '../../components/blog/PreviewLarge';

const titleStyles = ({ theme }) => css`
  ${headingZetta({ theme })};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.p500};
  text-align: center;
`;

const Title = styled('h1')(titleStyles);

export default class Page extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx);
    return { cookies };
  }

  render() {
    const posts = Posts.load();
    const sortedPosts = Posts.sortByDate(posts);
    const { title = 'Blog' } = this.props;
    return (
      <Fragment>
        <Meta title={title} />
        <Grid>
          <Row>
            <Col span={{ default: 12 }}>
              <Header.Wrapper>
                <Title>{title}</Title>
              </Header.Wrapper>
            </Col>
          </Row>
          <Row>
            <Col
              span={{ default: 12, kilo: 10, mega: 8 }}
              skip={{ default: 0, kilo: 1, mega: 2 }}
            >
              {sortedPosts.map((post, i) => (
                <PreviewLarge key={i} {...post} />
              ))}
            </Col>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}
