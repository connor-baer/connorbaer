import { ReactNode } from 'react';
import slugifyExternal from 'slugify';
import { isString, isArray } from 'lodash/fp';

const defaultOptions = {
  lower: true,
  // Strips everything except letters, digits, and whitespace.
  remove: /[^\w\d\s]/g,
};

export function slugify(string: ReactNode, customOpts = {}): string {
  const opts = { ...defaultOptions, ...customOpts };

  if (isString(string)) {
    return slugifyExternal(string, opts);
  }

  // NOTE: React children are often in the shape of an array,
  // even if it is a single string.
  if (isArray(string)) {
    const strings = string.filter(isString).join('-');
    return slugifyExternal(strings, opts);
  }

  return null;
}
