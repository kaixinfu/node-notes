const Koa = require('koa');
const app = new Koa();

const iptable = require('./Iptable');
app.use(iptable());

app.listen(3001, () => {
    console.log('iptable.....启动了')
})