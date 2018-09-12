import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values } from 'lodash/fp';
import { Text } from '@sumup/circuit-ui';

import { ALIGNMENTS } from '../../../constants';
import Align from '../Align';
import Image from '../../Image';

const captionStyles = ({ theme }) => css`
  display: block;
  margin-top: ${theme.spacings.giga};
  color: ${theme.colors.n700};
`;

const Caption = styled(Text)(captionStyles);

function Figure({ children, caption, align, ...rest }) {
  return (
    <Align align={align}>
      <Image {...rest} />
      {caption && (
        <Caption element="figcaption" size={Text.KILO} noMargin>
          {caption}
        </Caption>
      )}
    </Align>
  );
}

Figure.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  align: PropTypes.oneOf(values(ALIGNMENTS))
};

Figure.defaultProps = {
  align: ALIGNMENTS.LEFT
};

/**
 * @component
 */
export default Figure;
