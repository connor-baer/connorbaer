import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  font-size: ${theme.typography.headings.peta.fontSize};
  line-height: ${theme.typography.headings.peta.lineHeight};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.n700};
  margin-top: ${theme.spacings.kilo};

  ${theme.mq.mega`
    display: inline; 
    margin-top: 0;
    font-size: ${theme.typography.headings.zetta.fontSize};
    line-height: ${theme.typography.headings.zetta.lineHeight};
  `};
`;

const Subtitle = styled('h2')(baseStyles);

/**
 * @component
 */
export default Subtitle;
