import { sortBy, reverse } from 'lodash/fp';

export default function sortByDate(descending = true) {
  return items => {
    const sortedItems = sortBy(item => new Date(item.date).getTime(), items);
    return descending ? reverse(sortedItems) : sortedItems;
  };
}
