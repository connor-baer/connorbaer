import { capitalize } from 'lodash/fp';

import Blog from '../../blog';

Blog.getInitialProps = ctx => {
  const category = capitalize(ctx.query.category);
  return { category };
};

export default Blog;
