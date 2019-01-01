import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  column-gap: ${theme.spacings.exa};
  column-count: 1;
  column-break-inside: avoid;

  > * {
    display: inline-block;
    width: 100%;
  }

  ${theme.mq.kilo`
    column-count: 2;
  `}
`;

// HACK: Fix webkit (i.e. Safari and Chrome) bugs related to multi column layout.
const bugfixStyles = () => css`
  perspective: 1;

  > * {
    -webkit-transform: translate3d(0, 0, 0);
  }
`;

/**
 * Describe Columns here.
 */
const Columns = styled('div')(baseStyles, bugfixStyles);

Columns.propTypes = {
  /**
   * A consice description of the example prop.
   */
  example: PropTypes.string
};

Columns.defaultProps = {};

/**
 * @component
 */
export default Columns;
