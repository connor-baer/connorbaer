import { capitalize } from 'lodash/fp';

import { getPreview } from '../../../services/preview';
import Blog from '../../blog';

export function getServerSideProps({ query, ...context }) {
  const { category } = query;
  const title = category && capitalize(category);
  return { props: { title, category, preview: getPreview(context) } };
}

export default Blog;
