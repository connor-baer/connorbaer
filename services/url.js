import { BASE_URL } from '../constants/paths';

export function formatPath(path) {
  const pathname = path.replace(/(?:\/index)?\.mdx$/, '');
  return `${BASE_URL}/${pathname}`;
}
