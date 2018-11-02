'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log(this.ctx.query.name)
    await this.ctx.render('index.ejs')
  }
}

module.exports = HomeController;
