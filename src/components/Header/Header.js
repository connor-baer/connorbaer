import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import { headingZetta } from '../../styles/style-helpers';

const Wrapper = Grid.withComponent('header');

const rowStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.exa};
  margin-bottom: ${theme.spacings.exa};

  ${theme.mq.kilo`
    margin-top: 96px;
    margin-bottom: 96px;
  `};
`;

const StyledRow = styled(Row)(rowStyles);

/* eslint-disable no-irregular-whitespace */
const titleBaseStyles = ({ theme }) => css`
  ${headingZetta({ theme })};
  font-weight: ${theme.fontWeight.bold};

  &::after {
    content: ' ';
    display: inline;
  }

  ${theme.mq.kilo`
    display: inline;
    line-height: 54px;
  `};
`;
/* eslint-enable no-irregular-whitespace */

const titleColorStyles = ({ theme, hasColor }) =>
  hasColor &&
  css`
    color: ${theme.colors.p500};
  `;

const Title = styled('h1')(titleBaseStyles, titleColorStyles);

const subtitleStyles = ({ theme }) => css`
  font-size: ${theme.typography.headings.peta.fontSize};
  line-height: ${theme.typography.headings.peta.lineHeight};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.n700};
  margin-top: ${theme.spacings.kilo};

  ${theme.mq.kilo`
    display: inline; 
    margin-top: 0;
    font-size: ${theme.typography.headings.zetta.fontSize};
    line-height: 54px;
  `};
`;

const Subtitle = styled('h2')(subtitleStyles);

function Header({ title, subtitle, children }) {
  return (
    <Wrapper>
      <StyledRow>
        <Col span={{ default: 12, kilo: 9 }}>
          {title && <Title hasColor={!!subtitle}>{title}</Title>}
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {children}
        </Col>
      </StyledRow>
    </Wrapper>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

/**
 * @component
 */
export default Header;
