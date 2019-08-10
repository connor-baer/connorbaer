import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Grid, Row, Col } from '@sumup/circuit-ui';
import {
  Anchor,
  Meta,
  Main,
  Header,
  Prefooter,
  Footer
} from '@madebyconnor/bamboo-ui';

import components from './_components';
import Navigation from '../components/Navigation';
import IntroSection from '../components/projects/IntroSection';

import * as Url from '../services/url';
import { SITE_NAME, SITE_TWITTER } from '../constants';

export default ({
  title,
  subtitle,
  brief,
  image,
  skills,
  client,
  __resourcePath
}) =>
  function Project({ children }) {
    const url = Url.format(__resourcePath, true);

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
  };
