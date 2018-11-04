

// app/service/user.js
const Service = require('egg').Service;

class HomeService extends Service {
  async homeFindAll() {
    //这里的Home对于model 对应的大写
    const user = await this.ctx.model.Home.findAndCountAll({
      raw: false, // 设置为 true，即可返回源数据
      where: {
        // "id": 1
      },
      limit: 6,
      offset: 0,
      // order:[
      //     "id","DESC"
      // ]
    });
    return user;
  };

  async homeCreate(){
    //这里的业务只负责查询数据库，至于参数正不正确交给controller来完成
    const createUser = await this.ctx.model.Home.create({
      title:this.ctx.request.body.title,
      body:this.ctx.request.body.body
    });
    return createUser
  };

  async homeDelete(){
    const deleteUser = await this.ctx.model.Home.destroy({
      where:{
        id:this.ctx.request.body.id
      }
    });
    return deleteUser
  }

  async homeUpdate(){
    const updateUser = await this.ctx.model.Home.update({
      ...this.ctx.request.body
    },{
      where:{
        id:this.ctx.request.body.id
      }
    });
    return updateUser
  }
}

module.exports = HomeService;