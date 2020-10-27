import { themes } from '@madebyconnor/bamboo-ui';

const { standard } = themes;

export { standard };

const ASSET_BASEURL = 'https://assets.connor.li';

export const travel = {
  ...standard,
  fonts: [
    ...standard.fonts,
    {
      name: 'Playfair Display',
      localName: 'Playfair Display Bold',
      weight: '700',
      style: 'normal',
      sources: [
        `${ASSET_BASEURL}/fonts/playfair-display-v20-latin-700.woff2`,
        `${ASSET_BASEURL}/fonts/playfair-display-v20-latin-700.woff`,
      ],
    },
  ],
  fontStack: {
    ...standard.fontStack,
    serif: 'Playfair Display, Lora, Georgia, serif',
  },
};
