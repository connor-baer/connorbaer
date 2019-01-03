import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values } from 'lodash/fp';
import { Heading, Text } from '@sumup/circuit-ui';

import { BLOG_PATH } from '../../../constants/paths';
import * as CATEGORIES from '../../../constants/categories';

import Link from '../../Link';
import CoverImage from '../../images/CoverImage';
import PostMeta from '../PostMeta';

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.zetta};

  ${theme.mq.kilo`
    margin-bottom: 72px;
  `};
`;

const Article = styled('article')(articleStyles);

const titleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.kilo};
`;

const Title = styled(Heading)(titleStyles);

const descriptionStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.kilo};
  margin-bottom: ${theme.spacings.kilo};
  color: ${theme.colors.bodyColor};
`;

const Description = styled(Text)(descriptionStyles);

function PreviewLarge({
  slug,
  image,
  title,
  description,
  date,
  category,
  featured
}) {
  const { src, srcSet, alt } = image;
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article>
      <Link href={`${BLOG_PATH}/${slug}`} prefetch>
        <a>
          {featured && src && (
            <CoverImage
              src={src}
              srcSet={srcSet}
              alt={alt}
              aspectRatio={350 / 150}
            />
          )}
          <Title element="h2" size={Heading.PETA}>
            {title}
          </Title>
          {description && (
            <Description noMargin size={Text.GIGA}>
              {description}
            </Description>
          )}
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
