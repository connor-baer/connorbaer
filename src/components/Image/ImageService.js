// eslint-disable-next-line import/prefer-default-export
export function buildSourceUrl(path, format = 'jpg', highDPI = false) {
  let url = path;
  if (highDPI) {
    url += '@2x';
  }
  url += `.${format}`;
  return url;
}
