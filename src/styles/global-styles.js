import { injectGlobal } from 'react-emotion';

import { STATIC_URL } from '../constants';

function createFontFace({ name, weight, style }) {
  const basePath = `${STATIC_URL}/fonts/${name}-${weight}-${style}`;
  return `
    @font-face {
      font-family: ${name};
      font-style: ${style};
      font-weight: ${weight};
      src:
        local("${name}"),
        url("${basePath}.woff2") format("woff2"),
        url("${basePath}.woff") format("woff");
    };
  `;
}

const resets = `
  /* http://meyerweb.com/eric/tools/css/reset/
   * v2.0 | 20110126
   * License: none (public domain)
   */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote::before, blockquote::after,
  q::before, q::after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export default theme =>
  injectGlobal(`
${theme.fonts.map(createFontFace)}

${resets};

body {
  position: relative;
}

body,
button,
input,
optgroup,
select,
textarea {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  font-weight: ${theme.fontWeight.regular};
}

.fonts-loaded {
  body,
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: ${theme.fontFamily.sans};
  }
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: ${theme.fontWeight.bold};

  ${theme.mq.untilKilo`
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  `}
}

a {
  color: inherit;
  text-decoration: underline;
  text-decoration-skip: edges;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: ${theme.colors.p500};
    cursor: pointer;
  }
}

#nprogress {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: ${theme.colors.white};
  height: 3px;
  pointer-events: none;
  z-index: 1001;

  .bar {
    background: ${theme.colors.p500};
    height: 100%;
    width: 100%;
  }

  .peg {
    box-shadow: 0 0 10px ${theme.colors.p500}, 0 0 5px ${theme.colors.p500};
    display: block;
    height: 100%;
    opacity: 1;
    position: absolute;
    right: 0;
    transform: rotate(3deg) translate(0, -4px);
    width: 100px;
  }
}
`);
