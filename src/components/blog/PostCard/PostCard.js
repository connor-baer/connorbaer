import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values } from 'lodash/fp';
import { Heading } from '@sumup/circuit-ui';

import { BLOG_PATH } from '../../../constants/paths';
import * as CATEGORIES from '../../../constants/categories';

import Link from '../../Link';
import CoverImage from '../../CoverImage';
import PostMeta from '../PostMeta';

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

function PostCard({ slug, heroImage, title, publishDate, category }) {
  return (
    <Article>
      <Link href={{ pathname: BLOG_PATH, query: { slug } }} prefetch>
        <a>
          <CoverImage
            src={heroImage.fields.file.url}
            alt={heroImage.fields.description}
            aspectRatio={150 / 350}
          />
          <StyledHeading element="h2" size={Heading.TERA}>
            {title}
          </StyledHeading>
          <PostMeta date={publishDate} category={category} />
        </a>
      </Link>
    </Article>
  );
}

PostCard.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  publishDate: PropTypes.string,
  category: PropTypes.shape({
    name: PropTypes.oneOf(values(CATEGORIES)),
    slug: PropTypes.string
  })
};

PostCard.defaultProps = {};

/**
 * @component
 */
export default PostCard;
