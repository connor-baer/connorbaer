export function format(baseUrl, path) {
  const pathname = path.replace(/(?:\/index)?\.mdx$/, '');
  return `${baseUrl}/${pathname}`;
}
