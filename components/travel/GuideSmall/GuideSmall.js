import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { CoverImage, Heading, Paragraph } from '@madebyconnor/bamboo-ui';

import Link from '../../Link';

function getSizes(theme) {
  const deskSize = `(min-width: ${theme.breakpoints.desk}) 300px`;
  const lapSize = `(min-width: ${theme.breakpoints.lap}) 25vw`;
  const handSize = `(min-width: ${theme.breakpoints.hand}) 50vw`;
  const mobileSize = '100vw';

  return [deskSize, lapSize, handSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacing.l};
  margin-bottom: ${theme.spacing.l};
  position: relative;
`;

const Article = styled('article')(articleStyles);

const contentStyles = ({ theme }) => css`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: ${theme.spacing.xxl} ${theme.spacing.m} ${theme.spacing.m};
  background: linear-gradient(transparent, ${theme.color.shadow});
  border-bottom-left-radius: ${theme.borderRadius.m};
  border-bottom-right-radius: ${theme.borderRadius.m};
`;

const Content = styled('div')(contentStyles);

const titleStyles = ({ theme }) => css`
  margin-top: 0;
  margin-bottom: ${theme.spacing.xs};
  color: #fff;
  font-family: Playfair Display, ${theme.fontStack.serif};
`;

const Title = styled(Heading)(titleStyles);

const subtitleStyles = ({ theme }) => css`
  display: block;
  color: #fff;
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 0;
  max-height: ${theme.spacing.xxxl};
`;

const Subtitle = styled(Paragraph)(subtitleStyles);

export default function GuideSmall({
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
        <a>
          {image.src && (
            <CoverImage {...image} sizes={sizes} aspectRatio={3 / 5} />
          )}
          <Content>
            <Title as="h4">{title}</Title>
            <Subtitle size="kilo" lineHeight="kilo">
              {subtitle}
            </Subtitle>
          </Content>
        </a>
      </Link>
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

GuideSmall.propTypes = {
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
