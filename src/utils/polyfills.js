import 'objectFitPolyfill/dist/objectFitPolyfill.basic.min';

import { isServer } from '@madebyconnor/bamboo-ui';

const Polyfills = (() => {
  if (!isServer) {
    // eslint-disable-next-line global-require
    require('intersection-observer');
    objectFitPolyfill();
  }
})();

export default Polyfills;
