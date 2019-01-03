import React from 'react';
import PropTypes from 'prop-types';
import { values } from 'lodash/fp';
import { MDXProvider } from '@mdx-js/tag';
import { Grid, Row, Col, sharedPropTypes } from '@sumup/circuit-ui';

import CONFIG from '../config';
import { PROJECTS_PATH } from '../constants/paths';
import * as CATEGORIES from '../constants/categories';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Main from '../components/Main';
import Header from '../components/Header';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import components from './_components';
import IntroSection from '../components/projects/IntroSection';

function Project({
  children,
  title,
  subtitle,
  brief,
  image,
  slug,
  skills,
  client
}) {
  const postPath = `${PROJECTS_PATH}/${slug}`;
  const url = `${CONFIG.BASE_URL}${postPath}`;

  return (
    <>
      <Meta title={title} description={brief} url={url} image={image} />
      <Navigation />
      <Main>
        <article>
          <Grid>
            <Row>
              <Col span={{ default: 12, mega: 10, tera: 9 }}>
                <Header title={title} subtitle={subtitle} />
              </Col>
            </Row>
            <Row>
              <Col span={{ default: 12, tera: 6 }}>
                <IntroSection title="Overview">{brief}</IntroSection>
              </Col>
              <Col span={{ default: 12, mega: 6, tera: 3 }}>
                <IntroSection title="Involvement">
                  {skills.map(skill => (
                    <p key={skill}>{skill}</p>
                  ))}
                </IntroSection>
              </Col>
              <Col span={{ default: 12, mega: 6, tera: 3 }}>
                <IntroSection title="Client">{client}</IntroSection>
              </Col>
            </Row>
          </Grid>
          <Grid>
            <Row>
              <Col
                span={{ default: 12, mega: 10, tera: 8 }}
                skip={{ default: 0, mega: 1, tera: 2 }}
              >
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

Project.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  slug: PropTypes.string,
  date: PropTypes.string,
  category: PropTypes.oneOf(values(CATEGORIES)),
  children: sharedPropTypes.childrenPropType,
  theme: sharedPropTypes.themePropType
};

export default Project;
