import React from 'react';
import PropTypes from 'prop-types';
import { values } from 'lodash/fp';
import { format } from 'date-fns';
import styled, { css } from 'react-emotion';
import { Text } from '@sumup/circuit-ui';

import * as CATEGORIES from '../../../constants/categories';

const wrapperStyles = ({ theme }) => css`
  color: ${theme.colors.n700};
`;

const Wrapper = styled(Text)(wrapperStyles);

const timeStyles = ({ theme }) => css`
  &::after {
    content: '·';
    display: inline-block;
    padding: 0 ${theme.spacings.byte};
  }
`;

const Time = styled('time')(timeStyles);

function PostMeta({ date, category, className }) {
  if (!date && !category) {
    return null;
  }

  const formattedDate = format(new Date(date), 'MMMM d, yyyy');
  const datetime = format(new Date(date), 'yyyy-mm-dd');

  return (
    <Wrapper className={className} element="small" size={Text.KILO} noMargin>
      {date && <Time dateTime={datetime}>{formattedDate}</Time>}
      {category && <span>{category}</span>}
    </Wrapper>
  );
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
