import { animations, breakpoints, colors, fonts } from '../styles';

const Styles = () => (
  <div>
    <style jsx global>{`
      /* Font faces */
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 300;

        src: local('Overpass Light'), local('Overpass-Light'),
          url(https://fonts.gstatic.com/s/overpass/v1/tgqY5qOfB6w1HP32JTSrLIgp9Q8gbYrhqGlRav_IXfk.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 400;

        src: local('Overpass Regular'), local('Overpass-Regular'),
          url(https://fonts.gstatic.com/s/overpass/v1/o3S9a2vetxRRO8sKA6PL03YhjbSpvc47ee6xR_80Hnw.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 700;

        src: local('Overpass Bold'), local('Overpass-Bold'),
          url(https://fonts.gstatic.com/s/overpass/v1/z_QV2-z5a6o4brQE8JEVyogp9Q8gbYrhqGlRav_IXfk.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }

      @font-face {
        font-family: 'Overpass Mono';
        font-style: normal;
        font-weight: 400;

        src: local('Overpass Mono Regular'), local('OverpassMono-Regular'),
          url(https://fonts.gstatic.com/s/overpassmono/v2/MarHoIqW2hy_po97b_wS9nn3cbdKJftHIk87C9ihfO8.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }

      @font-face {
        font-family: 'Lora';
        font-style: normal;
        font-weight: 400;

        src: local('Lora Regular'), local('Lora-Regular'),
          url(https://fonts.gstatic.com/s/lora/v10/rAXKWvABQNHjPUk26ixVvvesZW2xOQ-xsNqO47m55DA.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Lora';
        font-style: italic;
        font-weight: 400;

        src: local('Lora Italic'), local('Lora-Italic'),
          url(https://fonts.gstatic.com/s/lora/v10/_MYF_5lLoOGnzKiQsUc_vevvDin1pK8aKteLpeZ5c0A.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Lora';
        font-style: normal;
        font-weight: 700;

        src: local('Lora Bold'), local('Lora-Bold'),
          url(https://fonts.gstatic.com/s/lora/v10/mlTYdpdDwCepOR2s5kS2CwLUuEpTyoUstqEm5AMlJo4.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }

      /* Base resets */
      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        font-size: 100%;
        vertical-align: baseline;
      }

      /* HTML5 display-role reset for older browsers. */
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section {
        display: block;
      }

      html {
        @media (max-width: ${breakpoints.small}) {
          font-size: 87.5%;
        }

        @media (min-width: ${breakpoints.large}) {
          font-size: 110%;
        }

        @media (min-width: ${breakpoints.wide}) {
          font-size: 115%;
        }

        transition: background-color ${animations.short},
          color ${animations.short};
        background-color: ${colors.gray[8]};
        color: ${colors.gray[9]};
        font-family: ${fonts.family.sans};
        word-wrap: break-word;
        box-sizing: border-box;
      }

      *,
      *::before,
      *::after {
        /* Inherit box-sizing to make it easier to change the property for components that leverage other behavior; see http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/. */
        box-sizing: inherit;
      }

      body {
        position: relative;
        max-width: 100vw;
        min-height: 100vh;
        transition: background-color ${animations.short};
        background-color: ${colors.white};
        overflow-x: hidden;
      }

      a {
        border: 0;
        color: inherit;
        text-decoration: none;
      }

      ol,
      ul {
        list-style: none;
      }

      blockquote,
      q {
        quotes: none;
      }

      blockquote::before,
      blockquote::after,
      q::before,
      q::after {
        content: '';
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      hr {
        margin-top: 1rem;
        margin-bottom: 1.25rem;
        border: 0;

        &::before {
          display: block;
          height: 2px;
          background-color: ${colors.gray[3]};
          content: '';
        }
      }

      textarea {
        resize: vertical;
      }

      dfn,
      i,
      em,
      .em {
        font-style: italic;
      }

      code,
      kbd,
      tt,
      var,
      samp,
      pre {
        font-family: ${fonts.family.mono};
      }

      .l-ctnr {
        display: block;
        width: 100%;
        max-width: 60rem;
        margin-right: auto;
        margin-left: auto;
        padding-right: 0.5rem;
        padding-left: 0.5rem;

        @media (min-width: ${breakpoints.medium}) {
          padding-right: 1.5rem;
          padding-left: 1.5rem;
        }
      }

      .l-flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .l-flex--center {
        justify-content: space-around;
      }

      [class*='l-w'] {
        display: block;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        padding-right: 1rem;
        padding-left: 1rem;
      }

      .l-columns {
        column-gap: 2rem;
        column-count: 1;
        column-break-inside: avoid;
        /* HACK: Fix webkit (i.e. Safari and Chrome) bugs related to multi column layout. */
        perspective: 1;

        @media (min-width: ${breakpoints.medium}) {
          column-count: 2;
        }

        & > * {
          /* HACK: Fix webkit (i.e. Safari and Chrome) bugs related to multi column layout. */
          -webkit-transform: translate3d(0, 0, 0);
        }
      }

      .l-w100 {
        width: 100%;
      }

      .l-w33 {
        width: 100%;

        @media (min-width: ${breakpoints.medium}) {
          width: calc(100% / 2);
        }

        @media (min-width: ${breakpoints.large}) {
          width: calc(100% / 3);
        }
      }

      .l-w66 {
        width: 100%;

        @media (min-width: ${breakpoints.large}) {
          width: calc(100% / 3 * 2);
        }
      }

      .l-w25 {
        width: calc(100% / 2);

        @media (min-width: ${breakpoints.large}) {
          width: calc(100% / 4);
        }
      }

      .l-w50 {
        width: 100%;

        @media (min-width: ${breakpoints.large}) {
          width: calc(100% / 2);
        }
      }

      .l-w75 {
        width: 100%;

        @media (min-width: ${breakpoints.large}) {
          width: calc(100% / 4 * 3);
        }
      }

      .cf::after {
        display: table;

        clear: both;

        content: '';
      }

      /* loading progress bar styles */
      #nprogress {
        pointer-events: none;

        & .bar {
          background: ${colors.primary};
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
        }

        & .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${colors.primary}, 0 0 5px ${colors.primary};
          opacity: 1;
          transform: rotate(3deg) translate(0px, -4px);
        }
      }
    `}</style>
  </div>
);

export { Styles };
