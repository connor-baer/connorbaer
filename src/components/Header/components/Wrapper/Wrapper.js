import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.exa};
  margin-bottom: ${theme.spacings.exa};

  ${theme.mq.kilo`
    margin-top: 96px;
    margin-bottom: 96px;
  `};
`;

const Wrapper = styled('header')(baseStyles);

/**
 * @component
 */
export default Wrapper;
