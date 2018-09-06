import { css } from 'react-emotion';
import { curry, mapValues } from 'lodash/fp';

export const disableVisually = () => `
  opacity: 0.5;
  pointer-events: none;
  box-shadow: none;
`;

export const createMediaQueries = curry(
  mapValues(mediaExpression => {
    const { prefix = '', suffix = '' } =
      typeof mediaExpression === 'string'
        ? {}
        : { prefix: '(min-width: ', suffix: 'px)' };
    const enhancedExpression = prefix + mediaExpression + suffix;
    return (...args) => css`
      @media ${enhancedExpression} {
        ${css(...args)};
      }
    `;
  })
);
