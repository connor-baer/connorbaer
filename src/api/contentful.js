import { createClient } from 'contentful';

import CONFIG from '../config';

const client = createClient({
  space: CONFIG.CONTENTFUL_SPACE,
  accessToken: CONFIG.CONTENTFUL_ACCESS_TOKEN,
  host: CONFIG.CONTENTFUL_HOST,
  environment: CONFIG.CONTENTFUL_ENVIRONMENT,
  timeout: 5000,
  insecure: false
});

function getAllEntries(query, skip = 0, limit = 200, items = []) {
  return client.getEntries({ ...query, skip, limit }).then(({ items: newItems, total, skip: newSkip }) => {
    const allItems = items.concat(newItems);
    if (total > allItems.length) {
      return getAllEntries(query, newSkip + limit, limit, allItems);
    }
    return allItems;
  });
}

export function getEntries(query) {
  return getAllEntries(query);
}

export function getEntry(id) {
  return client.getEntry(id);
}