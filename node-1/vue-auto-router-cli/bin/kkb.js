#!/usr/bin/env node
console.log('....kkb')
const program = require('commander')
program.version(require('../package.json').version)
program
  .command('init <name>')
  .description('init project')
  .action((name) => {
    // 触发回调
    console.log('init', name);
    const fnInit = require('../lib/init.js');
    fnInit(name)
  })
// 解析主进程的参数
program.parse(process.argv)

