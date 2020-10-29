import { BASE_URL } from '../constants/paths';

export function format(path: string, includeBaseUrl = false): string {
  const pathname = path.replace(/(?:\/index)?\.mdx$/, '');

  return includeBaseUrl ? `${BASE_URL}/${pathname}` : `/${pathname}`;
}
