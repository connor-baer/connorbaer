import queryString from 'query-string';

/**
 * Store a key value pair in the URL hash
 *
 * @param  {string} key    The key
 * @param  {string} value  The value to be stored
 */
export function setHashParam(key, value) {
  let parsed = queryString.parse(location.hash);

  if (value !== '') {
    parsed[key] = value;
    location.hash = queryString.stringify(parsed);
  } else {
    delete parsed[key];

    if (Object.keys(parsed).length > 0) {
      location.hash = queryString.stringify(parsed);
    } else {
      // Remove trailing # to prevent scrolling.
      history.replaceState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    }
  }
}

/**
 * Retrieve a value from the URL hash
 *
 * @param  {string} key  The key. Optional
 *
 * @return {string}  The stored value
 */
export function getHashParam(key) {
  let parsed = queryString.parse(location.hash);

  if (key) {
    return parsed[key];
  }
  return parsed;
}
