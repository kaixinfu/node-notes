const http = require('http');
const app = http.createServer((req, res) => {
    const { url, method } = req;
    console.log('cookie', req.headers.cookie)
    console.log('url...........', method, url);
    if (url === '/' && method === 'GET') {
        res.end('来自首页的请求')
    } else if (url === '/api/image') {
        console.log('.....image')
    } else if (url === '/proxy' && method === 'GET') {
        res.end("proxy.........")
    } else if (url === '/cors' && method === 'GET') {
        // 跨域资源共享 设置请求头
        // 服务器端通过在响应 header 中设置 Access-Control-Allow-Credentials = true 来运行客户端携带证书式访问。通过对 Credentials 参数的设置，就可以保持跨域 Ajax 时的 Cookie。
        // 这里需要注意的是：
        // 服务器端 Access-Control-Allow-Credentials = true时，参数Access-Control-Allow-Origin 的值不能为 '*'
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:4000",
        });
        res.end("cors.........")
    } else if (url === '/yujian' && method === 'OPTIONS') {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:4000",
            "Access-Control-Allow-Headers": "X-Token,Content-Type",
        });
        res.end()
    } else if (url === '/users' && method === 'GET') {
        console.log('cookie', req.headers.cookie);
        res.setHeader("Set-Cookie", "cookie=cookie111");
        res.setHeader("Content-Type", "application/json");
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.end(JSON.stringify([{ name: 'aaaa' }, { name: 'bbbb' }]))
    } else if (url === '/login' && method === 'POST') {
        let reqData = [];
        let size = 0;
        console.log('req ===>>>> begin', req);
        req.on('data', (data) => {
            console.log('req =====>>> on', data);
            reqData.push(data);
            size += data.length;
        })
        req.on('end', function () {
            console.log('end')
            const data = Buffer.concat(reqData, size);
            console.log('data:', size, data.toString())
            res.end(`formdata:${data.toString()}`)
        });
    } else if (url === '/loginbody' && method === 'POST') {
        let reqData = [];
        let size = 0;
    }
})

app.listen(3000, () => {
    console.log('app 3000 启动了...');

})
module.exports = app;