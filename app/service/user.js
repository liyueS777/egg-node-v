

// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {

  async UserLogin(){
    const login = await this.ctx.model.User.findOne({
        include:[{
            model:this.app.model.Home,
            as:"homeList"
        }],
        where:{
            name:this.ctx.request.body.name,
            password:this.ctx.request.body.password,
        }
    });
    return login
  }

  async UserRegister(){
    //   const user = await this.ctx.model.User.create(
    //     {
    //       homeId:this.ctx.request.body.homeId,
    //       name:this.ctx.request.body.name,
    //       password:this.ctx.request.body.password
    //     }
    //   );


      //使用事务 创建账号再更新home
      const user = await this.ctx.model.transaction(async t=>{
          var user = await this.ctx.model.User.create(
              {
            homeId:this.ctx.request.body.homeId,
            name:this.ctx.request.body.name,
            password:this.ctx.request.body.password
          },
          {transaction: t});
          var home = await this.ctx.model.Home.create(
            {
                title:'defalut title',
                body:'default body',
                userId:this.ctx.request.body.homeId
            },
            {transaction: t}
          );
          return {
              user,
              home
          }
      })
      return user;
  }
}

module.exports = UserService;