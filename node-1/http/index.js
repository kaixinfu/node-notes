const http = require('http');
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const server = http.createServer(async (req, res) => {
    const {url, method} = req;
    // console.log('url...', url);
    // console.log('method...', method);
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, {"Content-Type": "text/plain;charset=utf-8"});
                res.end('500, 服务器出错');
                return
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
                return
            }
        })
    } else if (url === '/users' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({name: '....liu', age: 10}))
    } else {
        res.serHeader = 404;
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('页面未找到')
    }
})
const port = 3030;
server.listen(port, () => {
    console.log(`${port}启动了`)
})