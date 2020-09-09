import { flow, map } from 'lodash/fp';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as projects } from '../pages/projects/*.mdx';
import * as Url from '../services/url';
import { filterByDraft } from '../utils/filter';
import { sortByTitle } from '../utils/sort';
import paginate from '../utils/paginate';

import usePreview from './use-preview';

export function enhance() {
  return map((project = {}) => {
    const url = project.__resourcePath
      ? Url.format(project.__resourcePath)
      : '';
    return { ...project, url };
  });
}

export default function useProjects({ page, skip } = {}) {
  const isPreview = usePreview();

  const cleanedProjects = flow(
    filterByDraft(isPreview),
    sortByTitle(),
  )(projects);
  const paginatedProjects = flow(
    paginate(page, skip),
    enhance(),
  )(cleanedProjects);
  const meta = {
    total: cleanedProjects.length,
    page,
    skip,
  };

  return [paginatedProjects, meta];
}
