import { curry } from 'lodash/fp';

const filterByCategory = curry((category, posts) => {
  if (!category) {
    return posts;
  }
  return posts.filter((post = {}) => post.category === category);
});

export default filterByCategory;
