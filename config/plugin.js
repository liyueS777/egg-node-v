'use strict';


exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
}

// had enabled by egg
exports.static = true;

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.redis = {
  enable:true,
  package:"egg-redis"
}
