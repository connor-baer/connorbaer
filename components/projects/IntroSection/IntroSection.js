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
  margin-bottom: ${theme.spacings.kilo};
`;

const Heading = styled('h3')(headingStyles);

export default function IntroSection({ title, children, className }) {
  return (
    <div className={className}>
      <Heading>{title}</Heading>
      <Intro as="h4">{children}</Intro>
    </div>
  );
}

IntroSection.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: sharedPropTypes.childrenPropType.isRequired
};
