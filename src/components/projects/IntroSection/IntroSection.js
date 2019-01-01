import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { SubHeading } from '@sumup/circuit-ui';

import Intro from '../../Intro';

const subHeadingStyles = ({ theme }) => css`
  letter-spacing: 1px;
  color: ${theme.colors.n500};
`;

const StyledSubHeading = styled(SubHeading)(subHeadingStyles);

const IntroSection = ({ title, body }) => (
  <>
    <StyledSubHeading size={SubHeading.MEGA}>{title}</StyledSubHeading>
    <Intro size={Intro.GIGA} element="h4">
      {body}
    </Intro>
  </>
);

IntroSection.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

IntroSection.defaultProps = {};

/**
 * @component
 */
export default IntroSection;
