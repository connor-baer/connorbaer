import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { toLower } from 'lodash/fp';
import { format } from 'date-fns';
import { Small } from '@madebyconnor/bamboo-ui';

import Link from '../../Link';

const wrapperStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.mega};
`;

const Wrapper = styled('div')(wrapperStyles);

export default function PostMeta({ date, category, className }) {
  if (!date && !category) {
    return null;
  }

  const formattedDate = format(new Date(date), 'MMMM d, yyyy');
  const datetime = format(new Date(date), 'yyyy-mm-dd');
  const categorySlug = toLower(category);

  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Wrapper className={className}>
      {date && (
        <Small element="time" dateTime={datetime}>
          {formattedDate}
        </Small>
      )}
      {category && (
        <Small>
          <Link
            href="/blog/category/[category]"
            as={`/blog/category/${categorySlug}`}
          >
            <a>{category}</a>
          </Link>
        </Small>
      )}
    </Wrapper>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PostMeta.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string,
  className: PropTypes.string
};
