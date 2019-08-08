import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { values, omit } from 'lodash/fp';
import { CoverImage, useTheme } from '@madebyconnor/bamboo-ui';

import { BLOG_PATH } from '../../../constants/paths';
import * as CATEGORIES from '../../../constants/categories';

import Link from '../../Link';
import PostMeta from '../PostMeta';

function getSizes(theme) {
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) 755px`;
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) 620px`;
  const mobileSize = '100vw';

  return [gigaSize, megaSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.zetta};

  ${theme.mq.kilo} {
    margin-bottom: 72px;
  }
`;

const Article = styled('article')(articleStyles);

const titleStyles = ({ theme }) => css`
  font-size: ${theme.fontSizes.tera};
  font-weight: ${theme.fontWeight.bold};
  line-height: ${theme.lineHeights.kilo};
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.kilo};
`;

const Title = styled('h2')(titleStyles);

const descriptionStyles = ({ theme }) => css`
  font-size: ${theme.fontSizes.mega};
  line-height: ${theme.lineHeights.mega};
  margin-top: ${theme.spacings.kilo};
  margin-bottom: ${theme.spacings.kilo};
  color: ${theme.colors.bodyColor};
`;

const Description = styled('p')(descriptionStyles);

function PreviewLarge({
  slug,
  image,
  title,
  description,
  date,
  category,
  featured
}) {
  const theme = useTheme();
  const sizes = getSizes(theme);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article>
      <Link href={`${BLOG_PATH}/${slug}`} prefetch>
        <a>
          {featured && image.src && (
            <CoverImage
              {...omit('toString', image)}
              sizes={sizes}
              aspectRatio={350 / 150}
            />
          )}
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
        </a>
      </Link>
      <PostMeta date={date} category={category} />
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewLarge.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  featured: PropTypes.bool,
  category: PropTypes.oneOf(values(CATEGORIES)),
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

/**
 * @component
 */
export default PreviewLarge;
