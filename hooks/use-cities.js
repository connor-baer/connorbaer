import { flow, map } from 'lodash/fp';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as cities } from '../pages/travel/city/*.mdx';
import * as Url from '../services/url';
import { filterByCategory, filterByDraft } from '../utils/filter';
import { sortByDate } from '../utils/sort';
import paginate from '../utils/paginate';

import usePreview from './use-preview';

export function enhance() {
  return map((city = {}) => {
    const url = city.__resourcePath ? Url.format(city.__resourcePath) : '';
    return { ...city, url };
  });
}

export default function useCities({ category, page, skip } = {}) {
  const isPreview = usePreview('travel');

  const cleanedCities = flow(
    filterByCategory(category),
    filterByDraft(isPreview),
    sortByDate(),
  )(cities);
  const paginatedCities = flow(paginate(page, skip), enhance())(cleanedCities);
  const meta = {
    total: cleanedCities.length,
    page,
    skip,
  };

  return [paginatedCities, meta];
}
