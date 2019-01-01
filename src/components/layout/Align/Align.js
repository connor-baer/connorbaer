import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values } from 'lodash/fp';

import { ALIGNMENTS } from '../../../constants';

const baseStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.tera};
`;

const rightStyles = ({ theme, align }) =>
  align === ALIGNMENTS.RIGHT &&
  css`
    ${theme.mq.kilo`
      float: right;
      margin-top: ${theme.spacings.kilo};
      margin-bottom: ${theme.spacings.giga};
      padding-left: ${theme.spacings.peta};
      width: calc(50% + ${theme.spacings.peta} / 2);
    `};

    ${theme.mq.mega`
      margin-right: -8.33%;
    `};

    ${theme.mq.tera`
      margin-right: -16.66%;
    `};
  `;

const leftStyles = ({ theme, align }) =>
  align === ALIGNMENTS.LEFT &&
  css`
    ${theme.mq.kilo`
      float: left;
      margin-top: ${theme.spacings.kilo};
      margin-bottom: ${theme.spacings.giga};
      padding-right: ${theme.spacings.peta};
      width: calc(50% + ${theme.spacings.peta} / 2);
    `};

    ${theme.mq.mega`
      margin-left: -8.33%;
    `};

    ${theme.mq.tera`
      margin-left: -16.66%;
    `};
  `;

const fullStyles = ({ theme, align }) =>
  align === ALIGNMENTS.FULL &&
  css`
    text-align: center;

    ${theme.mq.mega`
      margin: ${theme.spacings.peta} -8.33%;
      width: calc(100% + 8.33% * 2);
    `};

    ${theme.mq.tera`
      margin: ${theme.spacings.exa} -16.66%;
      width: calc(100% + 16.66% * 2);
    `};
  `;

const Align = styled('div')(baseStyles, rightStyles, leftStyles, fullStyles);

Align.RIGHT = ALIGNMENTS.RIGHT;
Align.LEFT = ALIGNMENTS.LEFT;
Align.CENTER = ALIGNMENTS.CENTER;
Align.FULL = ALIGNMENTS.FULL;

Align.propTypes = {
  align: PropTypes.oneOf(values(ALIGNMENTS))
};

Align.defaultProps = {
  align: ALIGNMENTS.CENTER
};

/**
 * @component
 */
export default Align;
