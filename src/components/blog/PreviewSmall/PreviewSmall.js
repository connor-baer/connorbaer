import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values, omit } from 'lodash/fp';
import { Heading } from '@sumup/circuit-ui';
import { Link, CoverImage } from '@madebyconnor/bamboo-ui';

import { BLOG_PATH } from '../../../constants/paths';
import * as CATEGORIES from '../../../constants/categories';

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

const headingStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};
  margin-bottom: ${theme.spacings.bit};
`;

const StyledHeading = styled(Heading)(headingStyles);

function PreviewSmall({ slug, image, title, date, category, theme }) {
  const sizes = getSizes(theme);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article>
      <Link href={`${BLOG_PATH}/${slug}`} prefetch>
        <a>
          {image.src && (
            <CoverImage
              {...omit('toString', image)}
              sizes={sizes}
              aspectRatio={350 / 150}
            />
          )}
          <StyledHeading element="h3" size={Heading.TERA}>
            {title}
          </StyledHeading>
        </a>
      </Link>
      <PostMeta date={date} category={category} />
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewSmall.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  category: PropTypes.oneOf(values(CATEGORIES)),
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    colors: PropTypes.array,
    alt: PropTypes.string
  }),
  theme: PropTypes.object
};

PreviewSmall.defaultProps = {
  image: {}
};

/**
 * @component
 */
export default PreviewSmall;
