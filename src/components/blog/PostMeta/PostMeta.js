import React from 'react';
import PropTypes from 'prop-types';
import { values } from 'lodash/fp';
import { format } from 'date-fns';
import styled, { css } from 'react-emotion';
import { Text } from '@sumup/circuit-ui';

import { BASE_URL, CATEGORY_PATH } from '../../../constants/paths';
import * as CATEGORIES from '../../../constants/categories';

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

  return (
    <Wrapper className={className} element="small" size={Text.KILO} noMargin>
      {date && <time dateTime={datetime}>{formattedDate}</time>}
      {category && (
        <a href={`${BASE_URL}${CATEGORY_PATH}/${category.fields.slug}`}>
          {category.fields.title}
        </a>
      )}
    </Wrapper>
  );
}

PostMeta.propTypes = {
  date: PropTypes.string,
  category: PropTypes.shape({
    name: PropTypes.oneOf(values(CATEGORIES)),
    slug: PropTypes.string
  }),
  className: PropTypes.string
};

/**
 * @component
 */
export default PostMeta;
