import { sortBy, reverse } from 'lodash/fp';

export function sortByDate(descending = true) {
  return (items = []) => {
    const sortedItems = sortBy(
      (item = {}) => new Date(item.date).getTime(),
      items,
    );
    return descending ? reverse(sortedItems) : sortedItems;
  };
}

export function sortByTitle(descending = true) {
  return (items = []) => {
    const sortedItems = sortBy('title', items);
    return descending ? reverse(sortedItems) : sortedItems;
  };
}
