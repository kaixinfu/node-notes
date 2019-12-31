'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async a() {
    const { ctx } = this;
    ctx.body = 'hi, a';
  }
}

module.exports = HomeController;
