import { curry, get } from 'lodash/fp';

import sortByDateUtil from '../utils/sort-by-date';

/* eslint-disable max-len */
import { meta as africaNotCountry } from '../pages/blog/africa-is-not-a-country/index.mdx';
import { meta as europeProud } from '../pages/blog/this-is-the-europe-i-am-proud-of/index.mdx';
import { meta as soundOfSilence } from '../pages/blog/sound-of-silence/index.mdx';
/* eslint-enable max-len */

export function load() {
  return [africaNotCountry, europeProud, soundOfSilence];
}

export const filterByCategory = curry((category, posts) =>
  posts.filter(post => get('category.name', post) === category.name)
);

export const sortByDate = curry(posts =>
  posts.sort((postA, postB) => sortByDateUtil(postA.date, postB.date))
);
