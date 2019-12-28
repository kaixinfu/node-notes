const express = require('express');
const proxy = new express();

const _proxy = require('http-proxy-middleware');

proxy.use(express.static(__dirname + '/'));

proxy.use('/', _proxy({ target: 'http://localhost:3000' }));
proxy.listen(4000, () => {
    console.log('proxy 4000 启动了...');

})

module.exports = proxy;