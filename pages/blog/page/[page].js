import { toNumber } from 'lodash/fp';

import Blog from '../../blog';

Blog.getInitialProps = (ctx) => {
  const page = toNumber(ctx.query.page);
  return { page };
};

export default Blog;
