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

const createTypeHelper = (type, name, nameMobile) => ({ theme }) => {
  const { fontSize, lineHeight } = theme.typography[type][name];
  const styles = `
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;

  if (!nameMobile) {
    return styles;
  }

  const {
    fontSize: fontSizeMobile,
    lineHeight: lineHeightMobile
  } = theme.typography[type][nameMobile];
  const stylesMobile = `
  ${theme.mq.untilKilo`
    font-size: ${fontSizeMobile};
    line-height: ${lineHeightMobile};
    `};
  `;

  return `${styles} ${stylesMobile}`;
};

export const headingKilo = createTypeHelper('headings', 'kilo');
export const headingMega = createTypeHelper('headings', 'mega');
export const headingGiga = createTypeHelper('headings', 'giga', 'mega');
export const headingTera = createTypeHelper('headings', 'tera', 'giga');
export const headingPeta = createTypeHelper('headings', 'peta', 'tera');
export const headingExa = createTypeHelper('headings', 'exa', 'peta');
export const headingZetta = createTypeHelper('headings', 'zetta', 'peta');

export const subHeadingKilo = createTypeHelper('subHeadings', 'kilo');
export const subHeadingMega = createTypeHelper('subHeadings', 'mega');

export const textKilo = createTypeHelper('text', 'kilo');
export const textMega = createTypeHelper('text', 'mega');
export const textGiga = createTypeHelper('text', 'giga', 'mega');
export const textTera = createTypeHelper('text', 'tera', 'giga');
