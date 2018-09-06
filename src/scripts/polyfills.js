import isServer from '../utils/is-server';

const Polyfills = (() => {
  if (!isServer) {
    // eslint-disable-next-line global-require
    require('intersection-observer');
  }
})();

export default Polyfills;
