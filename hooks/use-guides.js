import { flow, map } from 'lodash/fp';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as guides } from '../pages/travel/guides/*.mdx';
import * as Url from '../services/url';
import { filterByCategory, filterByDraft } from '../utils/filter';
import { sortByDate } from '../utils/sort';
import paginate from '../utils/paginate';
import usePreview from './use-preview';

export function enhance() {
  return map((guide = {}) => {
    const url = guide.__resourcePath ? Url.format(guide.__resourcePath) : '';
    return { ...guide, url };
  });
}

export default function useGuides({ category, page, skip } = {}) {
  const isPreview = usePreview();

  const cleanedGuides = flow(
    filterByCategory(category),
    filterByDraft(isPreview),
    sortByDate()
  )(guides);
  const paginatedGuides = flow(
    paginate(page, skip),
    enhance()
  )(cleanedGuides);
  const meta = {
    total: cleanedGuides.length,
    page,
    skip
  };

  return [paginatedGuides, meta];
}
