// TODO: Move to Bamboo UI once it supports TypeScript.
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import {
  sessionStore,
  localStore,
  serialize,
  parse,
} from '../services/storage';

function createHook(storage: Storage) {
  return <T>(
    key: string,
    initialValue?: T,
  ): [T, Dispatch<SetStateAction<T>>] => {
    const [state, setState] = useState(initialValue);

    // Initialize on first render on the client.
    useEffect(() => {
      const storedValue = storage.getItem(key);
      if (storedValue) {
        setState(parse(storedValue));
      }
    }, [key]);

    // Store value on every state change.
    useEffect(() => {
      storage.setItem(key, serialize(state));
    }, [key, state]);

    return [state, setState];
  };
}

export const useSessionStorage = createHook(sessionStore);
export const useLocalStorage = createHook(localStore);
