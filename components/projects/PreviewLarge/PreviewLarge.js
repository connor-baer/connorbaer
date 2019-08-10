import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { CoverImage, useTheme } from '@madebyconnor/bamboo-ui';

import Link from '../../Link';
import ProjectMeta from '../ProjectMeta';

function getSizes(theme) {
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) 555px`;
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) 455px`;
  const mobileSize = '100vw';

  return [gigaSize, megaSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};

  ${theme.mq.kilo} {
    margin-top: ${theme.spacings.exa};
  }
`;

const Article = styled('article')(articleStyles);

const titleStyles = ({ theme }) => css`
  font-size: ${theme.fontSizes.tera};
  font-weight: ${theme.fontWeight.bold};
  line-height: ${theme.lineHeights.kilo};
  margin-top: ${theme.spacings.giga};
`;

const Title = styled('h2')(titleStyles);

export default function PreviewLarge({ url, image, title, skills }) {
  const theme = useTheme();
  const sizes = getSizes(theme);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article>
      <Link href={url}>
        <a>
          {image.src && (
            <CoverImage {...image} sizes={sizes} aspectRatio={500 / 500} />
          )}
          <Title>{title}</Title>
        </a>
      </Link>
      <ProjectMeta skills={skills} />
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewLarge.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  featured: PropTypes.bool,
  skills: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    colors: PropTypes.array,
    alt: PropTypes.string
  })
};

PreviewLarge.defaultProps = {
  featured: false,
  image: {}
};
