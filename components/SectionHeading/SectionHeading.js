import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Heading, propTypes } from '@madebyconnor/bamboo-ui';

const sectionHeadingStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.zetta};
  margin-bottom: ${theme.spacings.kilo};
  color: ${theme.colors.n700};
  letter-spacing: 3px;
  text-transform: uppercase;

  ${theme.mq.kilo} {
    margin-top: ${theme.spacings.yotta};
    margin-bottom: ${theme.spacings.kilo};
  }
`;

const StyledHeading = styled(Heading)(sectionHeadingStyles);

export default function SectionHeading({ children, ...rest }) {
  return (
    <StyledHeading as="h3" size="kilo" {...rest}>
      {children}
    </StyledHeading>
  );
}

SectionHeading.propTypes = {
  children: propTypes.childrenPropType,
};
