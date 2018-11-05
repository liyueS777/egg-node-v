'use strict';
const path = require('path')
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '这是default的config的keys';

  // add your config here
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'ejs',
    defaultExtension: '.ejs',
    mapping:{
      '.ejs':'ejs',
    },
    root: path.join(appInfo.baseDir, 'app/view'),
    
  }

  config.security= {
    csrf: {
      enable: false
    }
  }
  //配置静态支援
  config.static = {
    prefix:'/public/',
    dir:path.join(appInfo.baseDir, 'app/public')
  }

  // 自定义端口
  exports.cluster = {
    listen: {
      port: 9898,
      hostname: '0.0.0.0',
      // path: '/var/run/egg.sock',
    }
  };
  return config;
};
