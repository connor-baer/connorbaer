import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/tag';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Main from '../components/Main';
import Header from '../components/Header';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import components from './_components';

function Article({ children, title, subtitle }) {
  return (
    <>
      <Meta title={title} description={subtitle} />
      <Navigation />
      <Main>
        <article>
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
        </article>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}

Article.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.element
};

export default Article;
