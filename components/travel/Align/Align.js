import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { RIGHT, LEFT, CENTER, FULL } from '../../../constants/align';

/**
 * HACK: The !important is necessary to override the default grid-column values
 * set in the guide layout. I know, it's not pretty.
 */

const baseStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.tera};

  grid-column: 1 / 13 !important;

  ${theme.mq.kilo} {
    grid-column: 2 / 12 !important;
  }

  ${theme.mq.mega} {
    grid-column: 5 / 13 !important;
  }
`;

const rightStyles = ({ theme, align = CENTER }) =>
  align === RIGHT &&
  css`
    grid-column: 1 / 13 !important;

    ${theme.mq.kilo} {
      grid-column: 2 / 12 !important;
    }

    ${theme.mq.mega} {
      grid-column: 5 / 13 !important;
    }
  `;

const leftStyles = ({ theme, align = CENTER }) =>
  align === LEFT &&
  css`
    grid-column: 1 / 13 !important;

    ${theme.mq.kilo} {
      grid-column: 2 / 12 !important;
    }

    ${theme.mq.mega} {
      grid-column: 1 / 5 !important;
      margin-top: ${theme.spacings.kilo};
      margin-bottom: 0;
    }
  `;

const fullStyles = ({ theme, align = CENTER }) =>
  align === FULL &&
  css`
    grid-column: 1 / 13 !important;

    ${theme.mq.kilo} {
      grid-column: 1 / 13 !important;
    }

    ${theme.mq.mega} {
      grid-column: 1 / 13 !important;
    }
  `;

const Align = styled('div')(baseStyles, rightStyles, leftStyles, fullStyles);

Align.RIGHT = RIGHT;
Align.LEFT = LEFT;
Align.CENTER = CENTER;
Align.FULL = FULL;

Align.propTypes = {
  align: PropTypes.oneOf([RIGHT, LEFT, CENTER, FULL]),
};

export default Align;
