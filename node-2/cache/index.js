const Koa = require('koa');
const app = new Koa();
const Cache = require('./Cache');
const cache = new Cache();

app.use(cache.fetchData());
app.use(require('koa-static')(__dirname + '/'));

const port = 3000;
app.listen(port, () => {
    console.log(`${port}端口启动了`)
});
