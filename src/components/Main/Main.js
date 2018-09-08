import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  min-height: 60vh;
  padding-top: 101px;
  background-color: ${theme.colors.bodyBg};
  color: ${theme.colors.bodyColor};

  ${theme.mq.mega`
    padding-top: 84px;
  `};
`;

const sidebarStyles = ({ theme, hasSidebar }) =>
  hasSidebar &&
  css`
    width: 100vw;

    ${theme.mq.mega`
      width: calc(100vw - 320px);
    `};
  `;

const Main = styled('main')(baseStyles, sidebarStyles);

Main.propTypes = {
  hasSidebar: PropTypes.bool
};

Main.defaultProps = {
  hasSidebar: false
};

export default Main;
