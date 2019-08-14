import { format } from 'date-fns';

export function formatDate(date) {
  return date && format(new Date(date), 'MMMM d, yyyy');
}

export function formatDatetime(date) {
  return date && format(new Date(date), 'yyyy-mm-dd');
}
