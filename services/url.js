import { BASE_URL } from '../constants/paths';

export function format(path, includeBaseUrl = false) {
  const pathname = path.replace(/(?:\/index)?\.mdx$/, '');

  return includeBaseUrl ? `${BASE_URL}/${pathname}` : `/${pathname}`;
}
