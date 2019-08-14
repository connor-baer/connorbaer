import { css } from '@emotion/core';
import styled from '@emotion/styled';

const baseStyles = ({ theme }) => css`
  grid-column: 1 / 13;
  border-top: 1px solid ${theme.colors.n300};
  border-bottom: 1px solid ${theme.colors.n300};
  margin-top: ${theme.spacings.giga};
  margin-bottom: ${theme.spacings.giga};
  padding-top: ${theme.spacings.tera};
  padding-bottom: ${theme.spacings.kilo};

  ${theme.mq.kilo} {
    grid-column: 2 / 12;
  }

  ${theme.mq.mega} {
    grid-column: 1 / 5;
    border: 0;
    margin: 0;
    padding: 0;
  }
`;

const Aside = styled('aside')(baseStyles);

export default Aside;
