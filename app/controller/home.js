'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async home() {
    console.log(this.ctx.query.name,'this.config',this.config.env)
    await this.ctx.render('index.ejs',{
      config:this.config.env,
      NODE_ENV:process.env.NODE_ENV,
      keys:this.config.keys
    })
  };

  async homeFindAll(){
    // console.log('sequelize:',this);
    try{
      await this.app.redis.set('init1',12345,'EX',60*2);
      var user = await this.ctx.service.home.homeFindAll();
      this.ctx.body =  {
        code:1,
        msg:"测试成功",
        user
      }
    }catch(e){
      console.log(e)
      this.ctx.body =  {
        code:-1,
        msg:'异常啦',
        e
      }
    }
  };

  async homeCreate(){
    try{
      if(this.ctx.request.body.title && this.ctx.request.body.body){
        var homeCreate = await this.ctx.service.home.homeCreate();
        this.ctx.body = {
          code:1,
          msg:"创建成功",
          homeCreate
        }
      }else {
        this.ctx.body = {
          code:-1,
          msg:'参数不正确或缺失'
        }
      }
    }
    catch(e){
      console.log(e)
      this.ctx.body = {
        code:-1,
        msg:'e'
      }
    }
  };

  async homeDelete(){
    try{
      if(!this.ctx.request.body.id){
        this.ctx.body = {
          code:-1,
          msg:"缺少id参数"
        }
      }else {
        var deleteUser = await this.ctx.service.home.homeDelete();
        this.ctx.body = {
          code:deleteUser==0?-2:1,
          msg:deleteUser==0?"所需要删除的数据不存在":"删除成功"
        }
      }
    }
    catch(e){
      console.log(e)
      this.ctx.body = {
        code:-1,
        msg:"删除异常",
        e
      }
    }
  }

  async homeUpdate(){
    try{
      if(!this.ctx.request.body.id){
        this.ctx.body = {
          code:-1,
          msg:"缺少id参数"
        }
      }else {
        var updateUser = await this.ctx.service.home.homeUpdate();
        this.ctx.body = {
          code:updateUser[0]==0?-2:1,
          msg:updateUser[0]==0?'所需要更新的id不存在':"更新成功"
        }
      }
    }
    catch(e){
      console.log(e)
      this.ctx.body = {
        code:-1,
        msg:"删除异常",
        e
      }
    }
  }
}

module.exports = HomeController;
