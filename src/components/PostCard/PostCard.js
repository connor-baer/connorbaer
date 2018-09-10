import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values } from 'lodash/fp';
import { Heading, Text } from '@sumup/circuit-ui';

import { IMAGES_PATH, BLOG_PATH } from '../../constants/paths';
import * as CATEGORIES from '../../constants/categories';

import Link from '../Link';
import CoverImage from '../CoverImage';

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

const metaStyles = ({ theme }) => css`
  display: inline-block;
  color: ${theme.colors.n500};

  &::after {
    content: '·';
    display: inline-block;
    padding: 0 ${theme.spacings.byte};
  }

  &:last-of-type::after {
    display: none;
  }
`;

const Meta = styled(Text)(metaStyles);

function PostCard({ slug, title, date, category }) {
  const postPath = `${BLOG_PATH}/${slug}`;
  const file = `${IMAGES_PATH}${postPath}/thumbnail`;

  return (
    <Article>
      <Link href={postPath}>
        <a>
          <CoverImage file={file} alt={title} />
          <StyledHeading element="h2" size={Heading.TERA}>
            {title}
          </StyledHeading>
          <Meta size={Text.KILO} noMargin>
            {date}
          </Meta>
          <Meta size={Text.KILO} noMargin>
            {category}
          </Meta>
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
