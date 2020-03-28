import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { CoverImage, Heading, Paragraph } from '@madebyconnor/bamboo-ui';

import Link from '../../Link';

function getSizes(theme) {
  const deskSize = `(min-width: ${theme.breakpoints.desk}) 240px`;
  const lapSize = `(min-width: ${theme.breakpoints.lap}) 25vw`;
  const handSize = `(min-width: ${theme.breakpoints.hand}) 50vw`;
  const mobileSize = '100vw';

  return [deskSize, lapSize, handSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};

  ${theme.mq.hand} {
    margin-top: ${theme.spacing.xxxl};
    margin-bottom: ${theme.spacing.xxxl};
  }

  ${theme.mq.lap} {
    margin-top: ${theme.spacing.xxxxl};
    margin-bottom: ${theme.spacing.xxxxl};
  }
`;

const Article = styled('article')(articleStyles);

const aStyles = ({ theme }) => css`
  display: flex;
  flex-wrap: wrap;

  ${theme.mq.hand} {
    flex-wrap: nowrap;
    align-items: center;
  }
`;

const A = styled('a')(aStyles);

const imageStyles = ({ theme }) => css`
  width: 100%;

  ${theme.mq.hand} {
    width: 50%;
    margin-right: ${theme.spacing.xl};
  }

  ${theme.mq.lap} {
    width: 33.33%;
  }
`;

const Image = styled('div')(imageStyles);

const contentStyles = ({ theme }) => css`
  padding-top: ${theme.spacing.m};
  width: 100%;

  ${theme.mq.hand} {
    padding: 0;
    width: 50%;
  }

  ${theme.mq.lap} {
    width: 66.66%;
  }
`;

const Content = styled('div')(contentStyles);

const titleStyles = ({ theme }) => css`
  margin-top: 0;
  margin-bottom: ${theme.spacing.xs};
  font-family: Playfair Display, ${theme.fontStack.serif};
`;

const Title = styled(Heading)(titleStyles);

const subtitleStyles = ({ theme }) => css`
  display: block;
  margin-bottom: 0;
  color: ${theme.color.bodyColor};
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Subtitle = styled(Paragraph)(subtitleStyles);

export default function GuideLarge({
  url,
  image = {},
  title,
  subtitle,
  className,
}) {
  const theme = useTheme();
  const sizes = getSizes(theme);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article className={className}>
      <Link href={url}>
        <A>
          {image.src && (
            <Image>
              <CoverImage {...image} sizes={sizes} aspectRatio={1.618} />
            </Image>
          )}
          <Content>
            <Title as="h2">{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </Content>
        </A>
      </Link>
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

GuideLarge.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  date: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    colors: PropTypes.array,
    alt: PropTypes.string,
  }),
  className: PropTypes.string,
};
