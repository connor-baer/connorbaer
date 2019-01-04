import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { Heading } from '@sumup/circuit-ui';

import { PROJECTS_PATH } from '../../../constants/paths';

import Link from '../../Link';
import CoverImage from '../../images/CoverImage';
import ProjectMeta from '../ProjectMeta';

function getSizes(theme) {
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) 555px`;
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) 455px`;
  const mobileSize = '100vw';

  return [gigaSize, megaSize, mobileSize].join(', ');
}

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

function PreviewLarge({ slug, image, title, skills, theme }) {
  const { src, srcSet, alt } = image;
  const sizes = getSizes(theme);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article>
      <Link href={`${PROJECTS_PATH}/${slug}`} prefetch>
        <a>
          {src && (
            <CoverImage
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              alt={alt}
              aspectRatio={500 / 500}
            />
          )}
          <Title noMargin element="h2" size={Heading.TERA}>
            {title}
          </Title>
        </a>
      </Link>
      <ProjectMeta skills={skills} />
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewLarge.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  featured: PropTypes.bool,
  skills: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    alt: PropTypes.string
  }),
  theme: PropTypes.object
};

PreviewLarge.defaultProps = {
  featured: false,
  image: {}
};

/**
 * @component
 */
export default PreviewLarge;
