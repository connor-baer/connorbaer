import { sortBy, reverse, toLower } from 'lodash/fp';

export function filterByCategory(category) {
  return (posts = []) => {
    if (!category) {
      return posts;
    }
    return posts.filter(
      (post = {}) => toLower(post.category) === toLower(category)
    );
  };
}

export function filterByArchived(archived = false) {
  return (posts = []) =>
    posts.filter((post = {}) =>
      post.archived ? post.archived === archived : !archived
    );
}

export function paginate(page, skip = 10) {
  return (posts = []) => posts.slice(page * skip, (page + 1) * skip);
}

export function sortByDate(descending = true) {
  return (posts = []) => {
    const sortedPosts = sortBy(
      (post = {}) => new Date(post.date).getTime(),
      posts
    );
    return descending ? reverse(sortedPosts) : sortedPosts;
  };
}
