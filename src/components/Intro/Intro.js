import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  font-weight: ${theme.fontWeight.light};
  font-size: 20px;
  line-height: 35px;
  margin-bottom: ${theme.spacings.tera};

  ${theme.mq.kilo`
    font-size: 25px;
    line-height: 44px;
  `};
`;

const Intro = styled('h3')(baseStyles);

Intro.propTypes = {
  children: PropTypes.string.isRequired
};

/**
 * @component
 */
export default Intro;
