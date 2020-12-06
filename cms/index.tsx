import { useContext } from 'react';
import { TinaCMS } from 'tinacms';

import { LazyTinaContext } from './components/withTina';

export function useCMS(): TinaCMS {
  const lazyTina = useContext(LazyTinaContext);
  const cms = lazyTina.useCMS();
  return cms;
}
