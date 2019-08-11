import { capitalize } from 'lodash/fp';

import Blog from '../../blog';

Blog.getInitialProps = ctx => {
  const { category } = ctx.query;
  const title = capitalize(category);
  return { title, category };
};

export default Blog;
