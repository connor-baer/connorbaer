import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Heading, propTypes } from '@madebyconnor/bamboo-ui';

const sectionHeadingStyles = ({ theme }) => css`
  margin-top: ${theme.spacing.xxxxl};
  margin-bottom: ${theme.spacing.s};
  color: ${theme.color.neutral[700]};
  letter-spacing: 3px;
  text-transform: uppercase;

  ${theme.mq.hand} {
    margin-top: ${theme.spacing.xxxxl};
    margin-bottom: ${theme.spacing.s};
  }
`;

const StyledHeading = styled(Heading)(sectionHeadingStyles);

export default function SectionHeading({ children, ...rest }) {
  return (
    <StyledHeading as="h3" size="m" {...rest}>
      {children}
    </StyledHeading>
  );
}

SectionHeading.propTypes = {
  children: propTypes.childrenPropType,
};
