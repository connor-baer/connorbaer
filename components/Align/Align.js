import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { propTypes } from '@madebyconnor/bamboo-ui';

import { RIGHT, LEFT, CENTER, FULL } from '../../constants/align';

const baseStyles = ({ theme }) => css`
  margin-top: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const rightStyles = ({ theme, align = CENTER }) =>
  align === RIGHT &&
  css`
    ${theme.mq.hand} {
      float: right;
      margin-top: ${theme.spacing.m};
      margin-bottom: ${theme.spacing.l};
      margin-right: -10.5%;
      padding-left: ${theme.spacing.xxl};
      width: calc(60.5% + ${theme.spacing.xxl} / 2);
    }

    ${theme.mq.lap} {
      margin-right: -26.66%;
    }
  `;

const leftStyles = ({ theme, align = CENTER }) =>
  align === LEFT &&
  css`
    ${theme.mq.hand} {
      float: left;
      margin-top: ${theme.spacing.m};
      margin-bottom: ${theme.spacing.l};
      margin-left: -10.5%;
      padding-right: ${theme.spacing.xxl};
      width: calc(60.5% + ${theme.spacing.xxl} / 2);
    }

    ${theme.mq.lap} {
      margin-left: -26.66%;
    }
  `;

const fullStyles = ({ theme, align = CENTER }) =>
  align === FULL &&
  css`
    text-align: center;

    ${theme.mq.hand} {
      margin: ${theme.spacing.xxl} -10.5%;
      width: calc(100% + 10.5% * 2);
    }

    ${theme.mq.lap} {
      margin: ${theme.spacing.xxxl} -26%;
      width: calc(100% + 26% * 2);
    }
  `;

const Align = styled('div')(baseStyles, rightStyles, leftStyles, fullStyles);

Align.RIGHT = RIGHT;
Align.LEFT = LEFT;
Align.CENTER = CENTER;
Align.FULL = FULL;

Align.propTypes = {
  align: propTypes.alignPropType,
};

export default Align;
