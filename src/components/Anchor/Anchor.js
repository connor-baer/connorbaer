import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { sharedPropTypes } from '@sumup/circuit-ui';

import Link from '../Link';

const baseStyles = ({ theme }) => css`
  color: ${theme.colors.p700};

  &:visited {
    color: ${theme.colors.v500};
  }

  &:hover,
  &:focus {
    color: ${theme.colors.p500};
  }

  &:active {
    color: ${theme.colors.p300};
  }
`;

const A = styled('a')`
  ${baseStyles};
`;

const Anchor = ({ children, title, className, id, ...otherProps }) => (
  <Link {...otherProps}>
    <A {...{ title, className, id }}>{children}</A>
  </Link>
);

Anchor.propTypes = {
  children: sharedPropTypes.childrenPropType.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string
};

/**
 * @component
 */
export default Anchor;
