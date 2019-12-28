const express = require('express');
const proxy = new express();

const _proxy = require('http-proxy-middleware');

proxy.use(express.static(__dirname + '/'));

// proxy.use('/upload', _proxy({ target: 'http://localhost:5000' }));

const port = 3000;
proxy.listen(port, () => {
    console.log(`${port} 启动了...`);

})

module.exports = proxy;