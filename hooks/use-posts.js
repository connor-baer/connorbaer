import { flow, map } from 'lodash/fp';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as posts } from '../pages/blog/*.mdx';
import * as Url from '../services/url';
import {
  filterByCategory,
  filterByArchived,
  filterByDraft
} from '../utils/filter';
import { sortByDate } from '../utils/sort';
import paginate from '../utils/paginate';
import usePreview from './use-preview';

export function enhance() {
  return map((post = {}) => {
    const url = post.__resourcePath ? Url.format(post.__resourcePath) : '';
    return { ...post, url };
  });
}

export default function usePosts({ category, isArchived, page, skip } = {}) {
  const isPreview = usePreview();

  const cleanedPosts = flow(
    filterByCategory(category),
    filterByArchived(isArchived),
    filterByDraft(isPreview),
    sortByDate()
  )(posts);
  const paginatedPosts = flow(
    paginate(page, skip),
    enhance()
  )(cleanedPosts);
  const meta = {
    total: cleanedPosts.length,
    page,
    skip
  };

  return [paginatedPosts, meta];
}
