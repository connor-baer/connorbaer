import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { toLower } from 'lodash/fp';
import { Small, Anchor } from '@madebyconnor/bamboo-ui';

import { formatDate, formatDatetime } from '../../../utils/date';

const wrapperStyles = ({ theme }) => css`
  margin-top: ${theme.spacing.m};
`;

const Wrapper = styled('div')(wrapperStyles);

const anchorStyles = (theme) => css`
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.color.neutral[700]};
`;

export default function PostMeta({ date, category, className }) {
  if (!date && !category) {
    return null;
  }

  const formattedDate = formatDate(date);
  const datetime = formatDatetime(date);
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
          <Anchor
            href="/blog/category/[category]"
            as={`/blog/category/${categorySlug}`}
            css={anchorStyles}
          >
            {category}
          </Anchor>
        </Small>
      )}
    </Wrapper>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PostMeta.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string,
  className: PropTypes.string,
};
