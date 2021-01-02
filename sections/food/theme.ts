import { themes } from '@madebyconnor/bamboo-ui';

const ASSET_BASEURL = 'https://assets.connor.li';

export const foodTheme = {
  ...themes.standard,
  color: {
    ...themes.standard.color,
    primary: {
      100: themes.standard.color.yellow[100],
      300: themes.standard.color.yellow[300],
      500: '#fab005',
      700: themes.standard.color.yellow[700],
      900: themes.standard.color.yellow[900],
    },
  },
  fonts: [
    ...themes.standard.fonts,
    {
      name: 'Spectral',
      localName: 'Spectral Extra Bold',
      weight: '800',
      style: 'normal',
      sources: [
        {
          url: `${ASSET_BASEURL}/fonts/Spectral-ExtraBold.woff2`,
          format: 'woff2',
        },
      ],
    },
  ],
  fontStack: {
    ...themes.standard.fontStack,
    display: 'Spectral, Playfair Display, Lora, Georgia, serif',
  },
};
