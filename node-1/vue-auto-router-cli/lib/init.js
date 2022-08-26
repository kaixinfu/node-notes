const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const { clone } = require('./downLoad')
const log = (content) => console.log(chalk.green(content))
module.exports = async (name) => {
  clear()
  const data = await figlet('KKB WELCOME')
  log('🚀创建项目:' + name)
  // 从github克隆项目到指定文件夹
  await clone('github:su37josephxia/vue-template', name)
}
