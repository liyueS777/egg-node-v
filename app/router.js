'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

 console.log('环境：',process.env.NODE_ENV)
module.exports = app => {
  const { router, controller } = app;
  router.get('/', app.middlewares.uppercase(),controller.home.index);
};
