'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login(){
    try{
      if(this.ctx.request.body.name && this.ctx.request.body.password){
        var user = await this.ctx.service.user.UserLogin();
        this.ctx.body = {
            code:1,
            msg:"ok",
            user
        }
      }else {
          this.ctx.body = {
          code:-1,
          msg:"缺少id参数"
        }
      }
    }
    catch(e){
      console.log(e)
      this.ctx.body = {
        code:-1,
        msg:"login异常",
        e
      }
    }
  };

  async register(){
    try{
      if(this.ctx.request.body.name && this.ctx.request.body.password&&this.ctx.request.body.homeId){
        var setToken = 'liyue666';
        this.ctx.session = {
          sessionId:this.ctx.request.body.name+'1234'
        };
        var setTokenResult = await this.app.redis.set(this.ctx.request.body.name+'1234',JSON.stringify(this.ctx.request.body),'EX',60*4);
        console.log('setTokenResult:',setTokenResult)
        if(setTokenResult){
          var user = await this.ctx.service.user.UserRegister();
          this.ctx.body = {
            code:1,
            msg:"注册成功",
            user:Object.assign({},user,{token:setToken})
          }
        }else {
          this.ctx.body = {
            code:-1,
            msg:"token异常"
          }
        }
        
      }else {
        this.ctx.body = {
          code:-1,
          msg:"缺少参数"
        }
      }
    }catch(e){
      console.log(e)
      this.ctx.body = {
        code:-1,
        msg:"regster异常",
        e
      }
    }
  }
}

module.exports = UserController;
