import styled, { css } from 'react-emotion';
import { Text } from '@sumup/circuit-ui';

const baseStyles = ({ theme }) => css`
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

const Small = styled(Text)(baseStyles);

Small.defaultProps = {
  element: 'small',
  size: Text.KILO,
  noMargin: true
};

/**
 * @component
 */
export default Small;
