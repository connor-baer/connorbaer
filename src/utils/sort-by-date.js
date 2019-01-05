export default function sortByDate(a, b, descending = true) {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();

  if (descending) {
    return dateB - dateA;
  }
  return dateA - dateB;
}
