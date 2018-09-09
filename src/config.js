import { get } from 'lodash';

import isServer from './utils/is-server';

export default (isServer
  ? global.publicConfig
  : get(window, ['__NEXT_DATA__', 'publicConfig'], {}));
