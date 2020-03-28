import { filter, toLower } from 'lodash/fp';

export function filterByCategory(category) {
  return (items = []) => {
    if (!category) {
      return items;
    }
    return items.filter(
      (item = {}) => toLower(item.category) === toLower(category),
    );
  };
}

export function filterByArchived(archived = false) {
  return filter((item = {}) =>
    item.archived ? item.archived === archived : !archived,
  );
}

export function filterByDraft(isPreview = false) {
  const now = new Date().getTime();

  return (items = []) => {
    if (isPreview) {
      return items;
    }
    return items.filter((item = {}) => {
      const isDraft =
        typeof item.isDraft !== 'undefined' ? item.isDraft : false;
      const isLive = item.date ? new Date(item.date).getTime() < now : true;
      return isLive && !isDraft;
    });
  };
}
