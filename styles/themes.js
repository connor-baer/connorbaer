import { themes } from '@madebyconnor/bamboo-ui';

const { standard } = themes;

export { standard };

export function blog({ darkmode, reducedMotion }) {
  const base = standard({ darkmode, reducedMotion });

  return {
    ...base,
    fonts: [
      ...base.fonts,
      {
        name: 'Lora',
        localName: 'Lora Regular',
        weight: '400',
        style: 'normal',
      },
      {
        name: 'Lora',
        localName: 'Lora Italic',
        weight: '400',
        style: 'italic',
      },
      {
        name: 'Lora',
        localName: 'Lora Bold',
        weight: '700',
        style: 'normal',
      },
    ],
    fontStack: {
      ...base.fontStack,
      serif: 'Lora, Georgia, serif',
    },
  };
}

export function travel({ darkmode, reducedMotion }) {
  const base = standard({ darkmode, reducedMotion });

  return {
    ...base,
    fonts: [
      ...base.fonts,
      {
        name: 'Playfair Display',
        localName: 'Playfair Display',
        weight: '400',
        style: 'normal',
      },
      {
        name: 'Playfair Display',
        localName: 'Playfair Display Bold',
        weight: '700',
        style: 'normal',
      },
    ],
    fontStack: {
      ...base.fontStack,
      serif: 'Playfair Display, Lora, Georgia, serif',
    },
  };
}
