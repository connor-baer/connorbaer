const routes = (module.exports = require('next-routes')());

routes.add('index', '/');
routes.add('blog', '/blog');
routes.add('posts', '/blog/:slug', 'blog/_post');
routes.add('food', '/food');
routes.add('recipes', '/food/:slug', 'food/_recipe');
routes.add('page', '/:slug', '_page');
