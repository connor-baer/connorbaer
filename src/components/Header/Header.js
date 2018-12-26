import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { sharedPropTypes } from '@sumup/circuit-ui';

import { headingZetta } from '../../styles/style-helpers';
import Wrapper from './components/Wrapper';

/* eslint-disable no-irregular-whitespace */
const titleStyles = ({ theme }) => css`
  ${headingZetta({ theme })};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.p500};

  &::after {
    ${theme.mq.mega`
      content: ' ';
      display: inline;
    `};
  }

  ${theme.mq.mega`
    display: inline;
  `};
`;
/* eslint-enable no-irregular-whitespace */

const Title = styled('h1')(titleStyles);

const subtitleStyles = ({ theme }) => css`
  font-size: ${theme.typography.headings.peta.fontSize};
  line-height: ${theme.typography.headings.peta.lineHeight};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.n700};
  margin-top: ${theme.spacings.kilo};

  ${theme.mq.mega`
    display: inline; 
    margin-top: 0;
    font-size: ${theme.typography.headings.zetta.fontSize};
    line-height: ${theme.typography.headings.zetta.lineHeight};
  `};
`;

const Subtitle = styled('h2')(subtitleStyles);

function Header({ title, subtitle, children }) {
  return (
    <Wrapper>
      {title && <Title hasColor={!!subtitle}>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Wrapper>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: sharedPropTypes.childrenPropType
};

Header.Wrapper = Wrapper;

/**
 * @component
 */
export default Header;
