'use strict';
const path = require('path')
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_12345654321';

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

  //配置静态支援
  config.static = {
    prefix:'/public/',
    dir:path.join(appInfo.baseDir, 'app/public')
  }

  config.sequelize = {
    dialect: 'mysql',
    host: 'cdb-k9iy22xs.cd.tencentcdb.com',
    port: 10027,
    database: 'startDB',
    username: 'root',
    password: "ly18820146660",
    'timezone': "+08:00",//东八区
    // 是否同步
    sync: { force: true }
  };

  config.security= {
    csrf: {
      enable: false
    }
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
