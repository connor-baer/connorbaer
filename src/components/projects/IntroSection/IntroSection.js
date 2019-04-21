import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { SubHeading, sharedPropTypes } from '@sumup/circuit-ui';
import { Intro } from '@madebyconnor/bamboo-ui';

const subHeadingStyles = ({ theme }) => css`
  letter-spacing: 1px;
  color: ${theme.colors.n500};
`;

const StyledSubHeading = styled(SubHeading)(subHeadingStyles);

const IntroSection = ({ title, children }) => (
  <>
    <StyledSubHeading size={SubHeading.MEGA}>{title}</StyledSubHeading>
    <Intro size={Intro.GIGA} element="h4">
      {children}
    </Intro>
  </>
);

IntroSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: sharedPropTypes.childrenPropType.isRequired
};

/**
 * @component
 */
export default IntroSection;
