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
        local(${name}),
        url(${basePath}.woff2) format("woff2"),
        url(${basePath}.woff) format("woff");
    };
  `;
}

export default theme =>
  injectGlobal(`
  ${theme.fonts.map(createFontFace)}

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
    text-decoration: none;
    transition: all 0.2s;
  }

  img {
    display: block;
    width: 100%;
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
