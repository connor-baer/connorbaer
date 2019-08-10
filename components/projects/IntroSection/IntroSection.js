import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Intro, sharedPropTypes } from '@madebyconnor/bamboo-ui';

const headingStyles = ({ theme }) => css`
  font-size: ${theme.fontSizes.byte};
  font-weight: ${theme.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${theme.colors.n500};
`;

const Heading = styled('h3')(headingStyles);

export default function IntroSection({ title, children }) {
  return (
    <>
      <Heading>{title}</Heading>
      <Intro size={Intro.GIGA} element="h4">
        {children}
      </Intro>
    </>
  );
}

IntroSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: sharedPropTypes.childrenPropType.isRequired
};
