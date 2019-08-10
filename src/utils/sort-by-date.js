import { sortBy } from 'lodash/fp';

export default function sortByDate(items) {
  return sortBy(item => new Date(item.date).getTime(), items);
}
