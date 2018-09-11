import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values } from 'lodash/fp';
import { Heading } from '@sumup/circuit-ui';

import { IMAGES_PATH, BLOG_PATH } from '../../../constants/paths';
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

function PostCard({ slug, title, date, category }) {
  const postPath = `${BLOG_PATH}/${slug}`;
  const file = `${IMAGES_PATH}${postPath}/thumbnail`;

  return (
    <Article>
      <Link href={postPath} prefetch>
        <a>
          <CoverImage file={file} alt={title} />
          <StyledHeading element="h2" size={Heading.TERA}>
            {title}
          </StyledHeading>
          <PostMeta date={date} category={category} />
        </a>
      </Link>
    </Article>
  );
}

PostCard.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  category: PropTypes.oneOf(values(CATEGORIES))
};

PostCard.defaultProps = {};

/**
 * @component
 */
export default PostCard;
