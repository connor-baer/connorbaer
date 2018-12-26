import React from 'react';
import PropTypes from 'prop-types';
import { values } from 'lodash/fp';
import { format } from 'date-fns';
import styled, { css } from 'react-emotion';
import { Text } from '@sumup/circuit-ui';

import { BASE_URL, CATEGORY_PATH } from '../../../constants/paths';
import * as CATEGORIES from '../../../constants/categories';
import Link from '../../Link';

const wrapperStyles = ({ theme }) => css`
  color: ${theme.colors.n700};

  *::after {
    content: '·';
    display: inline-block;
    padding: 0 ${theme.spacings.byte};
  }

  *:last-child::after {
    content: '';
  }
`;

const Wrapper = styled(Text)(wrapperStyles);

function PostMeta({ date, category, className }) {
  if (!date && !category) {
    return null;
  }

  const formattedDate = format(new Date(date), 'MMMM d, yyyy');
  const datetime = format(new Date(date), 'yyyy-mm-dd');

  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Wrapper className={className} element="small" size={Text.KILO} noMargin>
      {date && <time dateTime={datetime}>{formattedDate}</time>}
      {category && (
        <Link
          as={`${BASE_URL}${CATEGORY_PATH}/${category.slug}`}
          href={{ pathname: CATEGORY_PATH, query: { slug: category.slug } }}
        >
          <a>{category.name}</a>
        </Link>
      )}
    </Wrapper>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PostMeta.propTypes = {
  date: PropTypes.string,
  category: PropTypes.oneOf(values(CATEGORIES)),
  className: PropTypes.string
};

/**
 * @component
 */
export default PostMeta;
