import { toNumber } from 'lodash/fp';

import { getPreview } from '../../../services/preview';
import Blog from '../../blog';

export function getServerSideProps({ query, ...context }) {
  const page = toNumber(query.page);
  return { props: { page, preview: getPreview(context) } };
}

export default Blog;
