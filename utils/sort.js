import { sortBy, reverse } from 'lodash/fp';

// eslint-disable-next-line import/prefer-default-export
export function sortByDate(descending = true) {
  return (items = []) => {
    const sortedItems = sortBy(
      (item = {}) => new Date(item.date).getTime(),
      items,
    );
    return descending ? reverse(sortedItems) : sortedItems;
  };
}
