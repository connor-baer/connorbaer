import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { Heading } from '@sumup/circuit-ui';

const baseStyles = ({ theme }) => css`
  font-weight: ${theme.fontWeight.light};
  line-height: 1.75;

  ${theme.mq.kilo`
    line-height: 1.75;
  `};
`;

const Intro = styled(Heading)(baseStyles);

Intro.KILO = Heading.KILO;
Intro.MEGA = Heading.MEGA;
Intro.GIGA = Heading.GIGA;
Intro.TERA = Heading.TERA;
Intro.PETA = Heading.PETA;
Intro.EXA = Heading.EXA;
Intro.ZETTA = Heading.ZETTA;

Intro.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.oneOf([Intro.MEGA, Intro.GIGA, Intro.TERA, Intro.PETA])
};

Intro.defaultProps = {
  element: 'h3',
  size: Intro.TERA
};

/**
 * @component
 */
export default Intro;
