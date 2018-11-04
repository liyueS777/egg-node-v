

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
}

module.exports = UserService;