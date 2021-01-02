import { keys } from 'lodash/fp';

/* ISC License (ISC). Copyright 2017 Michal Zalecki */
// Adapted from https://michalzalecki.com/why-using-localStorage-directly-is-a-bad-idea/
export function storageFactory(storage: Storage): Storage {
  let inMemoryStorage: { [key: string]: string } = {};

  const isSupported = ((): boolean => {
    try {
      const testKey = '__some_random_key_you_are_not_going_to_use__';
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  })();

  function setItem(name: string, value: string): void {
    if (isSupported) {
      storage.setItem(name, value);
    } else {
      inMemoryStorage[name] = value;
    }
  }

  function getItem(name: string): string | null {
    if (isSupported) {
      return storage.getItem(name);
    }
    if (Object.prototype.hasOwnProperty.call(inMemoryStorage, name)) {
      return inMemoryStorage[name];
    }
    return null;
  }

  function removeItem(name: string): void {
    if (isSupported) {
      storage.removeItem(name);
    } else {
      delete inMemoryStorage[name];
    }
  }

  function clear(): void {
    if (isSupported) {
      storage.clear();
    } else {
      inMemoryStorage = {};
    }
  }

  function key(index: number): string | null {
    if (isSupported) {
      return storage.key(index);
    }
    return keys(inMemoryStorage)[index] || null;
  }

  function getLength(): number {
    return isSupported ? storage.length : Object.keys(inMemoryStorage).length;
  }

  return {
    setItem,
    getItem,
    removeItem,
    clear,
    key,
    isSupported,
    get length(): number {
      return getLength();
    },
  };
}

export const localStore = storageFactory(
  typeof window !== 'undefined' && window.localStorage,
);
export const sessionStore = storageFactory(
  typeof window !== 'undefined' && window.sessionStorage,
);

export function serialize(value: any): string {
  return JSON.stringify(value);
}

export function parse(value?: string | null): any {
  if (!value) {
    return null;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}
