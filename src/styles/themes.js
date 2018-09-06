import openColor from 'open-color/open-color.json';

import { createMediaQueries } from './style-helpers';

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
  fonts: [
    {
      name: 'Overpass',
      weight: '300',
      style: 'normal'
    },
    {
      name: 'Overpass',
      weight: '400',
      style: 'normal'
    },
    {
      name: 'Overpass',
      weight: '700',
      style: 'normal'
    },
    {
      name: 'Overpass Mono',
      weight: '400',
      style: 'normal'
    }
  ],
  fontFamily: {
    sans: 'Overpass',
    serif: 'Overpass',
    mono: 'Overpass Mono'
  },
  fontWeight: {
    light: '300',
    regular: '400',
    bold: '700'
  },
  colors: {
    white: openColor.white,
    black: openColor.black,
    p300: '#00ccd2',
    p500: '#1fb7e3',
    n100: openColor.gray[1],
    n300: openColor.gray[3],
    n500: openColor.gray[5],
    n700: openColor.gray[7],
    n900: openColor.gray[9],
    r100: openColor.red[1],
    r300: openColor.red[3],
    r500: openColor.red[5],
    r700: openColor.red[7],
    r900: openColor.red[9],
    b100: openColor.blue[1],
    b300: openColor.blue[3],
    b500: openColor.blue[5],
    b700: openColor.blue[7],
    b900: openColor.blue[9],
    g100: openColor.green[1],
    g300: openColor.green[3],
    g500: openColor.green[5],
    g700: openColor.green[7],
    g900: openColor.green[9],
    y100: openColor.yellow[1],
    y300: openColor.yellow[3],
    y500: openColor.yellow[5],
    y700: openColor.yellow[7],
    y900: openColor.yellow[9],
    o100: openColor.orange[1],
    o300: openColor.orange[3],
    o500: openColor.orange[5],
    o700: openColor.orange[7],
    o900: openColor.orange[9]
  },
  mq: createMediaQueries(breakpoints)
};

export const light = { ...base };

export const dark = {
  ...base,
  colors: {
    ...base.colors,
    white: openColor.black,
    black: openColor.white,
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
  fontFamily: {
    ...base.fontFamily,
    serif: 'Lora'
  }
};
