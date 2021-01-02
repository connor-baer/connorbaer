import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Instruction } from '@prisma/client';
import { Paragraph } from '@madebyconnor/bamboo-ui';

const stepStyles = ({ theme }) => css`
  font-family: ${theme.fontStack.display};
  font-size: ${theme.fontSize.xxl};
  line-height: 1.25;
  text-align: right;
  width: 2ch;
  margin-left: -0.75ch;
  margin-right: 0.5ch;
  flex-shrink: 0;
`;

const Number = styled('span')(stepStyles);

const Pr = styled(Paragraph)`
  display: flex;
  align-items: start;
`;

export interface InstructionsProps {
  instructions: Instruction[];
}

export function Instructions({
  instructions,
  ...props
}: InstructionsProps): JSX.Element {
  return (
    <div {...props}>
      {instructions.map(({ id, content }, index) => (
        <section key={id}>
          <Pr>
            <Number>{index + 1}</Number>
            <span>{content}</span>
          </Pr>
        </section>
      ))}
    </div>
  );
}
