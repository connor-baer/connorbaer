import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { CoverImage, Heading, useTheme } from '@madebyconnor/bamboo-ui';

import Link from '../../Link';
import PostMeta from '../PostMeta';

function getSizes(theme) {
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) 355px`;
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) 290px`;
  const kiloSize = `(min-width: ${theme.breakpoints.kilo}px) 50vw`;
  const mobileSize = '100vw';

  return [gigaSize, megaSize, kiloSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.kilo};
`;

const Article = styled('article')(articleStyles);

const titleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};
`;

const Title = styled(Heading)(titleStyles);

export default function PreviewSmall({
  url,
  image = {},
  title,
  date,
  category,
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
            <CoverImage {...image} sizes={sizes} aspectRatio={7 / 3} />
          )}
          <Title size="giga">{title}</Title>
        </a>
      </Link>
      <PostMeta date={date} category={category} />
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewSmall.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
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
