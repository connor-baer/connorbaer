import { FONTS_PATH } from '../constants/paths';

function createFontFace({ name, weight, style, localName }) {
  const basePath = `${FONTS_PATH}/${name}-${weight}-${style}`;
  return `
    @font-face {
      font-family: '${name}';
      font-style: ${style};
      font-weight: ${weight};
      font-display: swap;
      src:
        local('${localName || name}'),
        url('${basePath}.woff2') format('woff2'),
        url('${basePath}.woff') format('woff');
    };
  `;
}

export default ({ theme }) => `
${theme.fonts.map(createFontFace).join(' ')}

body,
button,
input,
optgroup,
select,
textarea {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  font-weight: ${theme.fontWeight.regular};
  text-decoration-skip: edges;
}

.fonts-loaded {
  body,
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: ${theme.fontStack.default};
  }
}

*::selection {
  background-color: ${theme.colors.selectionBg};
  color: ${theme.colors.selectionColor};
}

h1,
h2,
h3,
h4,
h5 {
  ${theme.mq.untilKilo`
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  `};
}

a {
  text-decoration: none;
  color: inherit;
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
`;
