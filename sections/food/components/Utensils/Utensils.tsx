import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Utensil } from '@prisma/client';

import SectionHeading from '../../../../components/SectionHeading';

const sectionStyles = (theme) => css`
  margin-top: ${theme.spacing.xxl} !important;
`;

const listStyles = ({ theme }) => css`
  line-height: ${theme.lineHeight.l};

  > * {
    display: block;
  }
`;

const List = styled('ul')(listStyles);

export interface UtensilsProps {
  utensils?: Utensil[];
}

export function Utensils({ utensils, ...props }: UtensilsProps) {
  return (
    <div {...props}>
      <SectionHeading css={sectionStyles}>Utensils</SectionHeading>
      <List>
        {utensils.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </List>
    </div>
  );
}
