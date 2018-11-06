'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

console.log('环境：', process.env.NODE_ENV)
const PREFIX = '/api/vi';
module.exports = app => {
  console.log('app.config.env:',app.config.env)
  const {
    router,
    controller
  } = app;
  router.get('/', app.middlewares.uppercase(), controller.home.home);
  router.post(PREFIX+'/index', app.middlewares.checkToken({},app),controller.home.homeFindAll);
  router.post(PREFIX+'/create', controller.home.homeCreate);
  router.post(PREFIX+'/deleteById', controller.home.homeDelete);
  router.post(PREFIX+'/update', controller.home.homeUpdate);
  router.post(PREFIX+'/login', controller.user.login);
  router.post(PREFIX+'/register', controller.user.register);
};