import { useContext } from 'react';
import { TinaCMS } from 'tinacms';

import { LazyTina, LazyTinaContext } from './components/withTina';

export { withTina } from './components/withTina';

export function useCMS(): TinaCMS {
  const lazyTina = useContext(LazyTinaContext);
  const cms = lazyTina.useCMS();
  return cms;
}

export function useLazyTina(): LazyTina {
  const lazyTina = useContext(LazyTinaContext);
  return lazyTina;
}
