import openColor from 'open-color/open-color.json';

import { createMediaQueries } from './style-helpers';

const fonts = [
  {
    name: 'Overpass',
    localName: 'Overpass Light',
    weight: '300',
    style: 'normal'
  },
  {
    name: 'Overpass',
    localName: 'Overpass Regular',
    weight: '400',
    style: 'normal'
  },
  {
    name: 'Overpass',
    localName: 'Overpass Bold',
    weight: '700',
    style: 'normal'
  }
];

const fontStack = {
  default: 'Overpass, Helvetica, Arial, sans-serif',
  sans: 'Overpass, Helvetica, Arial, sans-serif',
  serif: 'Overpass, Helvetica, Arial, sans-serif',
  mono: 'Courier New, mono-space'
};

const fontWeight = {
  light: '300',
  regular: '400',
  bold: '700'
};

const typography = {
  headings: {
    kilo: {
      fontSize: '17px',
      lineHeight: '24px'
    },
    mega: {
      fontSize: '19px',
      lineHeight: '24px'
    },
    giga: {
      fontSize: '22px',
      lineHeight: '28px'
    },
    tera: {
      fontSize: '24px',
      lineHeight: '32px'
    },
    peta: {
      fontSize: '28px',
      lineHeight: '36px'
    },
    exa: {
      fontSize: '36px',
      lineHeight: '44px'
    },
    zetta: {
      fontSize: '42px',
      lineHeight: '56px'
    }
  },
  subHeadings: {
    kilo: {
      fontSize: '12px',
      lineHeight: '20px'
    },
    mega: {
      fontSize: '14px',
      lineHeight: '18px'
    }
  },
  text: {
    kilo: {
      fontSize: '15px',
      lineHeight: '24px'
    },
    mega: {
      fontSize: '18px',
      lineHeight: '32px'
    },
    giga: {
      fontSize: '21px',
      lineHeight: '42px'
    }
  }
};

const neutrals = {
  n100: openColor.gray[1],
  n300: openColor.gray[3],
  n500: openColor.gray[6],
  n700: openColor.gray[7],
  n900: openColor.gray[9]
};

const violets = {
  v100: openColor.violet[1],
  v300: openColor.violet[3],
  v500: openColor.violet[5],
  v700: openColor.violet[7],
  v900: openColor.violet[9]
};

const blues = {
  b100: openColor.blue[1],
  b300: openColor.blue[3],
  b500: openColor.blue[5],
  b700: openColor.blue[7],
  b900: openColor.blue[9]
};

const greens = {
  g100: openColor.green[1],
  g300: openColor.green[3],
  g500: openColor.green[5],
  g700: openColor.green[7],
  g900: openColor.green[9]
};

const yellows = {
  y100: openColor.yellow[1],
  y300: openColor.yellow[3],
  y500: openColor.yellow[5],
  y700: openColor.yellow[7],
  y900: openColor.yellow[9]
};

const oranges = {
  o100: openColor.orange[1],
  o300: openColor.orange[3],
  o500: openColor.orange[5],
  o700: openColor.orange[7],
  o900: openColor.orange[9]
};

const reds = {
  r100: openColor.red[1],
  r300: openColor.red[3],
  r500: openColor.red[5],
  r700: openColor.red[7],
  r900: openColor.red[9]
};

const primary = {
  p300: '#00ccd2',
  p500: '#1fb7e3'
};

const misc = {
  shadow: '#0C0F14',
  bodyBg: openColor.white,
  bodyColor: '#111519',
  danger: reds.r500,
  success: greens.g700,
  warning: yellows.y700
};

const colors = {
  white: openColor.white,
  black: openColor.black,
  ...neutrals,
  ...violets,
  ...blues,
  ...greens,
  ...yellows,
  ...oranges,
  ...reds,
  ...primary,
  ...misc
};

export const borderRadius = {
  kilo: '1px',
  mega: '4px',
  giga: '5px'
};

function createSpacings(base = 4) {
  return {
    bit: `${base * 1}px`,
    byte: `${base * 2}px`,
    kilo: `${base * 3}px`,
    mega: `${base * 4}px`,
    giga: `${base * 6}px`,
    tera: `${base * 8}px`,
    peta: `${base * 10}px`,
    exa: `${base * 12}px`,
    zetta: `${base * 14}px`
  };
}

function createGrid(base = 4) {
  return {
    default: {
      priority: 0,
      breakpoint: 'default',
      cols: 12,
      maxWidth: '1080px',
      gutter: createSpacings(base).peta
    },
    untilKilo: {
      priority: 1,
      breakpoint: 'untilKilo',
      cols: 12,
      maxWidth: `400px`,
      gutter: createSpacings(base).peta
    },
    kilo: {
      priority: 2,
      breakpoint: 'kilo',
      cols: 12,
      maxWidth: '700px',
      gutter: createSpacings(base).peta
    },
    mega: {
      priority: 3,
      breakpoint: 'mega',
      cols: 12,
      maxWidth: '1000px',
      gutter: createSpacings(base).exa
    },
    tera: {
      priority: 4,
      breakpoint: 'tera',
      cols: 12,
      maxWidth: '1200px',
      gutter: createSpacings(base).exa
    }
  };
}

const breakpoints = {
  untilKilo: '(max-width: 479px)',
  kilo: 480,
  kiloToMega: '(min-width: 480px) and (max-width: 767px)',
  mega: 768,
  untilMega: '(max-width: 767px)',
  megaToGiga: '(min-width: 768px) and (max-width: 959px)',
  giga: 960,
  gigaToTera: '(min-width: 960px) and (max-width: 1279px)',
  tera: 1280
};

const base = {
  fonts,
  fontStack,
  fontWeight,
  typography,
  colors,
  borderRadius,
  spacings: createSpacings(),
  grid: createGrid(),
  mq: createMediaQueries(breakpoints)
};

export const light = { ...base };

export const dark = {
  ...base,
  colors: {
    ...base.colors,
    white: openColor.black,
    black: openColor.white,
    bodyBg: '#1b1f22',
    bodyColor: openColor.white,
    n100: openColor.gray[9],
    n300: openColor.gray[7],
    n500: openColor.gray[5],
    n700: openColor.gray[3],
    n900: openColor.gray[1]
  }
};

export const blog = {
  ...base,
  fonts: [
    ...base.fonts,
    {
      name: 'Lora',
      weight: '400',
      style: 'normal'
    },
    {
      name: 'Lora',
      weight: '400',
      style: 'italic'
    },
    {
      name: 'Lora',
      weight: '700',
      style: 'normal'
    }
  ],
  fontStack: {
    ...base.fontStack,
    serif: 'Lora, Georgia, serif'
  }
};
