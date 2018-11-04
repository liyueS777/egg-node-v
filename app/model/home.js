'use strict';

module.exports = app => {
  const {INTEGER, STRING, DATE} = app.Sequelize;
  var home = app.model.define('home', 
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique:true
    },
    title: {
      type: STRING,
      comment: '标题'
    },
    userId: {
      type: INTEGER,
      comment: 'userId'
    },
    body: {
      type: STRING,
      comment: '内容'
    },
    created_at: {
      type: DATE
    },
    updated_at: {
      type: DATE
    }
  },
  {
    'freezeTableName': true,//值为ture时不修改
  }
);
  home.sync();
  return home

};