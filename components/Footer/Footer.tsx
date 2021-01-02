import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Footer as BambooFooter, Main, Anchor } from '@madebyconnor/bamboo-ui';

import { NAME, TWITTER } from '../../constants/site';

const variantStyles = ({ theme, variant }) =>
  variant === 'sidebar' &&
  css`
    ${theme.mq.lap} {
      width: calc(100vw - 25rem);
      min-width: calc(100vw - 30vw);
    }
  `;

const StyledFooter = styled(BambooFooter)(variantStyles);

export interface FooterProps {
  children?: ReactNode;
  variant?: 'sidebar';
}

export function Footer({ children, ...rest }: FooterProps): JSX.Element {
  return (
    <StyledFooter siteName={NAME} siteTwitter={TWITTER} {...rest}>
      <Anchor href="/disclaimer">Disclaimer</Anchor>
      {children}
    </StyledFooter>
  );
}
