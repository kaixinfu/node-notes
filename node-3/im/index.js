/**
 * net 是node的一个模块，底层小功能模块，
 * 和http的区别是，它是连接对象，http是请求和响应对象
 */
const net = require('net');
const app = net.createServer();
const connects = [];
/**
 * res 即为连接对象
 */
app.on('connection', (res) => {
    res.write('hi, 连接上了');
    connects.push(res);
    res.on('data', data => {
        console.log('data', data.toString());
        // 通知所有连接者
        connects.filter(item => item !== res).forEach(connect => {
            connect.write(data)
        })
    })
})
app.listen(9000, () => {
    console.log('....net连接服务启动了')
})

// Linux telnet命令用于远端登入。
// 使用telnet连接这个服务
// telnet localhost 9000 即可