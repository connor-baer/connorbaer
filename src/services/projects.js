import { curry, get } from 'lodash/fp';

import sortByDateUtil from '../utils/sort-by-date';

/* eslint-disable max-len */
import { meta as uwcBlogs } from '../pages/projects/uwc-blogs/index.mdx';
import { meta as uwcDeutschland } from '../pages/projects/uwc-deutschland/index.mdx';
import { meta as gutshausLangensee } from '../pages/projects/gutshaus-langensee/index.mdx';
import { meta as jekyllThemes } from '../pages/projects/jekyll-themes/index.mdx';
/* eslint-enable max-len */

export function load() {
  return [uwcBlogs, uwcDeutschland, gutshausLangensee, jekyllThemes];
}

export const filterByCategory = curry((category, posts) => {
  if (!category) {
    return posts;
  }
  return posts.filter(post => get('category.name', post) === category.name);
});

export const sortByDate = curry(posts =>
  posts.sort((postA, postB) => sortByDateUtil(postA.date, postB.date))
);
