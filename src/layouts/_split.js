import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { sharedPropTypes } from '@sumup/circuit-ui';
import Portal from '../components/Portal/Portal';

const SIDEBAR_ID = 'portal-sidebar';

const baseStyles = ({ theme }) => css`
  position: relative;
  width: 100vw;

  ${theme.mq.tera`
    width: 50vw;
  `};
`;

const Left = styled('div')(baseStyles);

const rightStyles = ({ theme }) => css`
  ${theme.mq.tera`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  `};
`;

const Right = styled('div')(baseStyles, rightStyles);

function Split({ children }) {
  return (
    <>
      <Right id={SIDEBAR_ID} />
      <Left>{children}</Left>
    </>
  );
}

Split.propTypes = {
  children: sharedPropTypes.childrenPropType
};

function Sidebar({ children }) {
  return <Portal selector={`#${SIDEBAR_ID}`}>{children}</Portal>;
}

Sidebar.propTypes = {
  children: PropTypes.element
};

export { Sidebar };
export default Split;
