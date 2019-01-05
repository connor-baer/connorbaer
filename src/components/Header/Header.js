import React from 'react';
import PropTypes from 'prop-types';
import { sharedPropTypes } from '@sumup/circuit-ui';

import Wrapper from './components/Wrapper';
import Title from './components/Title';
import Subtitle from './components/Subtitle';

function Header({ title, subtitle, children, className }) {
  return (
    <Wrapper className={className}>
      {title && <Title hasColor={!!subtitle}>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Wrapper>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  children: sharedPropTypes.childrenPropType
};

Header.Wrapper = Wrapper;
Header.Title = Title;
Header.Subtitle = Subtitle;

/**
 * @component
 */
export default Header;
