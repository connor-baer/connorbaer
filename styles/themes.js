import { themes } from '@madebyconnor/bamboo-ui';

const { standard: theme } = themes;

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
      fontSize: '14px',
      lineHeight: '24px'
    },
    mega: {
      fontSize: '16px',
      lineHeight: '32px'
    },
    giga: {
      fontSize: '21px',
      lineHeight: '42px'
    }
  }
};

function createGrid(spacings) {
  return {
    default: {
      priority: 0,
      breakpoint: 'default',
      cols: 12,
      maxWidth: '1080px',
      gutter: spacings.peta
    },
    untilKilo: {
      priority: 1,
      breakpoint: 'untilKilo',
      cols: 12,
      maxWidth: `400px`,
      gutter: spacings.peta
    },
    kilo: {
      priority: 2,
      breakpoint: 'kilo',
      cols: 12,
      maxWidth: '700px',
      gutter: spacings.peta
    },
    mega: {
      priority: 3,
      breakpoint: 'mega',
      cols: 12,
      maxWidth: '1000px',
      gutter: spacings.exa
    },
    giga: {
      priority: 4,
      breakpoint: 'giga',
      cols: 12,
      maxWidth: '1000px',
      gutter: spacings.exa
    },
    afterTera: {
      priority: 5,
      breakpoint: 'tera',
      cols: 12,
      maxWidth: '1200px',
      gutter: spacings.exa
    }
  };
}

export function standard({ darkmode, baseSpacing, reducedMotion }) {
  const base = theme({ darkmode, baseSpacing, reducedMotion });
  const grid = createGrid(base.spacings);

  return {
    ...base,
    grid,
    typography
  };
}

export function blog({ darkmode, baseSpacing, reducedMotion }) {
  const base = theme({ darkmode, baseSpacing, reducedMotion });
  const grid = createGrid(base.spacings);

  return {
    ...base,
    fonts: [
      ...base.fonts,
      {
        name: 'Lora',
        localName: 'Lora Regular',
        weight: '400',
        style: 'normal'
      },
      {
        name: 'Lora',
        localName: 'Lora Italic',
        weight: '400',
        style: 'italic'
      },
      {
        name: 'Lora',
        localName: 'Lora Bold',
        weight: '700',
        style: 'normal'
      }
    ],
    grid,
    typography,
    fontStack: {
      ...base.fontStack,
      serif: 'Lora, Georgia, serif'
    }
  };
}
