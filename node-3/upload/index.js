const http = require('http');
const path = require('path');
const fs = require('fs');
const chunk = []
let size = 0

const app = http.createServer((req, res) => {
    const { url, method } = req;
    // console.log('url...........', method, url);
    if (url === '/upload') {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Headers": "file-name,Content-Type",
        });
        // console.log('req.headers', req.headers);
        const fileName = req.headers['file-name'] ? req.headers['file-name'] : '1.png';
        const outputFile = path.resolve(__dirname, fileName);
        console.log('outputFile', outputFile);
        const fis = fs.createWriteStream(outputFile);
        // console.log('fis', fis);
        // req.pipe(fis);


        // Buffer connect
        // req.on('data', data => {
        //     chunk.push(data)
        //     size += data.length
        //     console.log('data:', data, size)
        // })
        // req.on('end', () => {
        //     console.log('end...')
        //     const buffer = Buffer.concat(chunk, size)
        //     size = 0
        //     fs.writeFileSync(outputFile, buffer)
        //     response.end()
        // })

        // 流事件写入
        // req.on('data', data => {
        //     console.log('data:',data)
        //     fis.write(data)
        // })
        // req.on('end', () => {
        //     fis.end()
        //     response.end()
        // })

        // res.end('....success');
    }
})

const port = 5000;
app.listen(port, () => {
    console.log(`upload ${port} 启动了...`);

})
require('./proxy');
module.exports = app;