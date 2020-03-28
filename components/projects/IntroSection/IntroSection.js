import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Intro, propTypes } from '@madebyconnor/bamboo-ui';

import SectionHeading from '../../SectionHeading';

const headingStyles = ({ theme }) => css`
  margin-top: ${theme.spacing.s};

  ${theme.mq.kilo} {
    margin-top: ${theme.spacing.s};
  }
`;

const Heading = styled(SectionHeading)(headingStyles);

export default function IntroSection({ title, children, ...rest }) {
  return (
    <div {...rest}>
      <Heading>{title}</Heading>
      <Intro>{children}</Intro>
    </div>
  );
}

IntroSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: propTypes.childrenPropType.isRequired,
};
