import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { RIGHT, LEFT, CENTER, FULL } from '../../../constants/align';

const baseStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.tera};
`;

const rightStyles = ({ theme, align = CENTER }) =>
  align === RIGHT &&
  css`
    ${theme.mq.kilo} {
      float: right;
      margin-top: ${theme.spacings.mega};
      margin-bottom: ${theme.spacings.giga};
      margin-right: -10.5%;
      padding-left: ${theme.spacings.peta};
      width: calc(60.5% + ${theme.spacings.peta} / 2);
    }

    ${theme.mq.mega} {
      margin-right: -26.66%;
    }
  `;

const leftStyles = ({ theme, align = CENTER }) =>
  align === LEFT &&
  css`
    ${theme.mq.kilo} {
      float: left;
      margin-top: ${theme.spacings.mega};
      margin-bottom: ${theme.spacings.giga};
      margin-left: -10.5%;
      padding-right: ${theme.spacings.peta};
      width: calc(60.5% + ${theme.spacings.peta} / 2);
    }

    ${theme.mq.mega} {
      margin-left: -26.66%;
    }
  `;

const fullStyles = ({ theme, align = CENTER }) =>
  align === FULL &&
  css`
    text-align: center;

    ${theme.mq.kilo} {
      margin: ${theme.spacings.peta} -10.5%;
      width: calc(100% + 10.5% * 2);
    }

    ${theme.mq.mega} {
      margin: ${theme.spacings.exa} -26%;
      width: calc(100% + 26% * 2);
    }
  `;

const Align = styled('div')(baseStyles, rightStyles, leftStyles, fullStyles);

Align.RIGHT = RIGHT;
Align.LEFT = LEFT;
Align.CENTER = CENTER;
Align.FULL = FULL;

Align.propTypes = {
  align: PropTypes.oneOf([RIGHT, LEFT, CENTER, FULL])
};

/**
 * @component
 */
export default Align;
