import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { propTypes } from '@madebyconnor/bamboo-ui';

import Align from '../Align';

const baseStyles = ({ theme }) => css`
  border-top: 1px solid ${theme.colors.n300};
  border-bottom: 1px solid ${theme.colors.n300};
  margin-top: ${theme.spacings.giga};
  margin-bottom: ${theme.spacings.giga};
  padding-top: ${theme.spacings.mega};
  padding-bottom: ${theme.spacings.bit};
`;

const leftStyles = ({ align, theme }) =>
  align === Align.LEFT &&
  css`
    ${theme.mq.mega} {
      border: 0;
      margin-top: ${theme.spacings.byte};
      margin-bottom: 0;
      padding: 0;
    }
  `;

const StyledAlign = styled(Align)(baseStyles, leftStyles);

export default function Aside({ children, align = Align.LEFT, ...rest }) {
  return (
    <StyledAlign as="aside" align={align} {...rest}>
      {children}
    </StyledAlign>
  );
}

Aside.RIGHT = Align.RIGHT;
Aside.LEFT = Align.LEFT;
Aside.CENTER = Align.CENTER;
Aside.FULL = Align.FULL;

Aside.propTypes = {
  children: propTypes.childrenPropType,
  align: propTypes.alignPropType,
};
