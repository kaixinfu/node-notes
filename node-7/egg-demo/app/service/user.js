'use strict'
const Service = require('egg').Service;

class UserService extends Service {
    async getAll() {
        // return [
        //     { name: 'kaixin' },
        //     { name: 'liping' }
        // ]
        return await this.ctx.model.user.findAll();
    }
}

module.exports = UserService
