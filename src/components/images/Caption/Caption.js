import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { Text } from '@sumup/circuit-ui';

const baseStyles = ({ theme }) => css`
  display: block;
  margin-top: ${theme.spacings.giga};
  color: ${theme.colors.n700};
`;

const Caption = styled(Text)(baseStyles);

Caption.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

Caption.defaultProps = {
  element: 'figcaption',
  size: Text.KILO,
  noMargin: true
};

/**
 * @component
 */
export default Caption;
