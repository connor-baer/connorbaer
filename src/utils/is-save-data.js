import isServer from './is-server';

/**
 * Inspired by https://www.filamentgroup.com/lab/js-web-fonts.html
 */
export default (() => {
  // Necessary APIs missing
  if (isServer || !navigator || !navigator.connection) {
    return false;
  }

  // User prefers to save data
  if (navigator.connection.saveData) {
    return true;
  }

  // User is on slow connection
  if (
    navigator.connection.effectiveType === 'slow-2g' ||
    navigator.connection.effectiveType === '2g'
  ) {
    return true;
  }

  return false;
})();
