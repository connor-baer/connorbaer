import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values } from 'lodash/fp';
import { Text } from '@sumup/circuit-ui';

import { ALIGNMENTS } from '../../../constants';
import Align from '../Align';

const sharedStyles = ({ theme }) => css`
  font-family: ${theme.fontStack.serif};
  font-style: italic;
  font-size: 24px;
  line-height: 32px;

  ${theme.mq.kilo`
    font-size: 32px;
    line-height: 42px;
  `};
`;

const quoteStyles = ({ theme }) => css`
  ${sharedStyles({ theme })};

  > p {
    ${sharedStyles({ theme })};
    margin-bottom: 0;
  }
`;

const Quote = styled('blockquote')(quoteStyles);

const citeStyles = ({ theme }) => css`
  display: block;
  margin-top: ${theme.spacings.kilo};
  color: ${theme.colors.n700};

  &::before {
    display: inline;
    content: '— ';
  }
`;

const Cite = styled(Text)(citeStyles);

function Blockquote({ children, cite, align, ...rest }) {
  return (
    <Align align={align}>
      <Quote {...rest}>{children}</Quote>
      {cite && (
        <Cite element="cite" size={Text.KILO} noMargin>
          {cite}
        </Cite>
      )}
    </Align>
  );
}

Blockquote.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cite: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  align: PropTypes.oneOf(values(ALIGNMENTS))
};

Blockquote.defaultProps = {
  align: ALIGNMENTS.LEFT
};

/**
 * @component
 */
export default Blockquote;
