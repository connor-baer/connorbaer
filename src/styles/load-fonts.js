import { includes, differenceWith, isEqual, isEmpty } from 'lodash/fp';
import FontFaceObserver from 'fontfaceobserver';

import isServer from '../utils/is-server';

function addClass(element, className) {
  if (includes(className, element.className)) {
    return;
  }
  // eslint-disable-next-line no-param-reassign
  element.className += ` ${className}`;
}

export default function loadFonts(fonts, timeout = 5000) {
  if (isServer || isEmpty(fonts)) {
    return;
  }

  const prevLoadedFonts =
    sessionStorage.getItem('prevLoadedFonts') &&
    JSON.parse(sessionStorage.getItem('prevLoadedFonts'));

  const fontsToLoad = prevLoadedFonts
    ? differenceWith(isEqual, fonts, prevLoadedFonts)
    : fonts;

  // Optimization for repeat views
  if (isEmpty(fontsToLoad)) {
    addClass(document.documentElement, 'fonts-loaded');
    return;
  }

  const fontPromises = fonts.map(({ name, config }) => {
    const font = new FontFaceObserver(name, config);
    return font.load(null, timeout);
  });

  Promise.all(fontPromises)
    .then(() => {
      addClass(document.documentElement, 'fonts-loaded');
      // Optimization for repeat views
      sessionStorage.setItem('prevLoadedFonts', JSON.stringify(fonts));
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.warn(`Failed to load font "${e.family}"`);
    });
}
