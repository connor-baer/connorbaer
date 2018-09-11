import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { Text } from '@sumup/circuit-ui';

const baseStyles = ({ theme }) => css`
  font-weight: ${theme.fontWeight.light};
  font-size: 24px;
  line-height: 42px;

  ${theme.mq.kilo`
    font-size: 25px;
    line-height: 44px;
  `};
`;

const Intro = styled(Text)(baseStyles);

Intro.propTypes = {
  children: PropTypes.string.isRequired
};

/**
 * @component
 */
export default Intro;
