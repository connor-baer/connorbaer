import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values } from 'lodash/fp';
import { Heading } from '@sumup/circuit-ui';

import { PROJECTS_PATH } from '../../../constants/paths';
import * as CATEGORIES from '../../../constants/categories';

import Link from '../../Link';
import CoverImage from '../../CoverImage';
import PostMeta from '../../blog/PostMeta';

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};

  ${theme.mq.kilo`
    margin-top: ${theme.spacings.exa};
  `};
`;

const Article = styled('article')(articleStyles);

const titleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};
`;

const Title = styled(Heading)(titleStyles);

function PreviewLarge({ slug, image, title, date, category }) {
  const { src, srcSet, alt } = image;
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article>
      <Link href={`${PROJECTS_PATH}/${slug}`} prefetch>
        <a>
          {src && (
            <CoverImage
              src={src}
              srcSet={srcSet}
              alt={alt}
              aspectRatio={500 / 500}
            />
          )}
          <Title noMargin element="h2" size={Heading.TERA}>
            {title}
          </Title>
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
