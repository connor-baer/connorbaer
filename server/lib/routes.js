const routes = (module.exports = require('next-routes')());

routes.add('index', '/');
routes.add('blog', '/blog');
routes.add('food', '/food');
routes.add('recipe', '/food/:slug', 'food/_recipe');
routes.add('page', '/:slug', '_page');
