import path from 'path';
import requireAll from 'require-all';

const posts = requireAll({
  dirname: path.resolve(__dirname, `../src/pages/blog`),
  filter: /index.mdx$/,
  recursive: true
});

export default posts;
