#!/usr/bin/env node

const program = require('commander');
const {init, refresh} = require('../lib/api')

program.version(require('../package').version, '-v', '--version');


program
    .command('init <name>')
    .description('init project')
    .action(init)

program
    .command('refresh')
    .action(refresh)

program.parse(process.argv)