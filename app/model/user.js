'use strict';

module.exports = app => {
  const {INTEGER, STRING, DATE} = app.Sequelize;
  var user = app.model.define('user', 
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique:true
    },
    homeId: {
      type: INTEGER,
      comment: 'homeId'
    },
    name: {
      type: STRING,
      comment: '名字'
    },
    password:{
      type: STRING,
      comment: '密码'
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
    // classMethods:{
    //     associate(){
    //         user.hasMany(app.model.Home,{
    //             foreignKey:"id",
    //             targetKey:"userId",
    //             as:"homeList"
    //         })
    //     }
    // }
  }
);
user.associate = function(){
  user.hasMany(app.model.Home,{
    //这里的targetKey指的是查询该表需要关联的字段
    //这里的userId是指关联对应的外表的字段
    foreignKey:"userId",
    targetKey:"homeId",
    as:"homeList"//这里先as，最后引用的时候在as 名称
})
}
  user.sync();
  return user

};