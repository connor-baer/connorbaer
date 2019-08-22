import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  CoverImage,
  Heading,
  Paragraph,
  useTheme
} from '@madebyconnor/bamboo-ui';

import Link from '../../Link';

function getSizes(theme) {
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) 240px`;
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) 25vw`;
  const kiloSize = `(min-width: ${theme.breakpoints.kilo}px) 50vw`;
  const mobileSize = '100vw';

  return [gigaSize, megaSize, kiloSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};
  margin-bottom: ${theme.spacings.giga};
  position: relative;
`;

const Article = styled('article')(articleStyles);

const contentStyles = ({ theme }) => css`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: ${theme.spacings.peta} ${theme.spacings.mega} ${theme.spacings.mega};
  background: linear-gradient(transparent, ${theme.colors.shadow});
  border-bottom-left-radius: ${theme.borderRadius.giga};
  border-bottom-right-radius: ${theme.borderRadius.giga};
`;

const Content = styled('div')(contentStyles);

const titleStyles = ({ theme }) => css`
  margin-top: 0;
  margin-bottom: ${theme.spacings.byte};
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
  max-height: ${theme.spacings.exa};
`;

const Subtitle = styled(Paragraph)(subtitleStyles);

export default function GuidePreview({
  url,
  image = {},
  title,
  subtitle,
  className
}) {
  const theme = useTheme();
  const sizes = getSizes(theme);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article className={className}>
      <Link href={url} prefetch>
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

GuidePreview.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  date: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    colors: PropTypes.array,
    alt: PropTypes.string
  }),
  className: PropTypes.string
};
