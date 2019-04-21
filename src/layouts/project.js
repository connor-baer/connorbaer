import React from 'react';
import PropTypes from 'prop-types';
import { values } from 'lodash/fp';
import { MDXProvider } from '@mdx-js/tag';
import { Grid, Row, Col, sharedPropTypes } from '@sumup/circuit-ui';
import {
  Anchor,
  Meta,
  Main,
  Header,
  Prefooter,
  Footer,
  sharedPropTypes as bambooPropTypes
} from '@madebyconnor/bamboo-ui';

import components from './_components';
import Navigation from '../components/Navigation';
import IntroSection from '../components/projects/IntroSection';

import { PROJECTS_PATH, BASE_URL } from '../constants/paths';
import { SITE_NAME, SITE_TWITTER } from '../constants';
import * as CATEGORIES from '../constants/categories';

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
  const url = `${BASE_URL}/${PROJECTS_PATH}/${slug}`;

  return (
    <>
      <Meta
        title={title}
        description={brief}
        url={url}
        image={image}
        siteName={SITE_NAME}
        siteTwitter={SITE_TWITTER}
      />
      <Navigation />
      <Main>
        <article>
          <Grid>
            <Row>
              <Col span={{ default: 12, mega: 10, afterTera: 9 }}>
                <Header title={title} subtitle={subtitle} />
              </Col>
            </Row>
            <Row>
              <Col span={{ default: 12, afterTera: 6 }}>
                <IntroSection title="Overview">{brief}</IntroSection>
              </Col>
              <Col span={{ default: 12, mega: 6, afterTera: 3 }}>
                <IntroSection title="Involvement">
                  {skills.map(skill => (
                    <p key={skill}>{skill}</p>
                  ))}
                </IntroSection>
              </Col>
              <Col span={{ default: 12, mega: 6, afterTera: 3 }}>
                <IntroSection title="Client">{client}</IntroSection>
              </Col>
            </Row>
          </Grid>
          <Grid>
            <Row>
              <Col
                span={{ default: 12, mega: 10, afterTera: 8 }}
                skip={{ default: 0, mega: 1, afterTera: 2 }}
              >
                <MDXProvider components={components}>{children}</MDXProvider>
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
      <Footer siteName={SITE_NAME} siteTwitter={SITE_TWITTER}>
        <Anchor href="/disclaimer">Disclaimer</Anchor>
      </Footer>
    </>
  );
}

Project.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  slug: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.shape(bambooPropTypes.imagePropType),
  category: PropTypes.oneOf(values(CATEGORIES)),
  children: sharedPropTypes.childrenPropType,
  theme: sharedPropTypes.themePropType,
  brief: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string),
  client: PropTypes.string
};

export default Project;
