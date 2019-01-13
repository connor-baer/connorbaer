import { themes } from '@madebyconnor/bamboo-ui';

const { standard } = themes;

export { standard };

export function blog({ darkmode, baseSpacing, reducedMotion }) {
  const base = standard({ darkmode, baseSpacing, reducedMotion });
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
    fontStack: {
      ...base.fontStack,
      serif: 'Lora, Georgia, serif'
    }
  };
}
