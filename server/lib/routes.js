const routes = (module.exports = require('next-routes')());

routes.add('recipe', '/food/:slug', 'food/_recipe');
