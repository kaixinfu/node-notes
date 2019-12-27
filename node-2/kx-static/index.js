const Koa = require('koa');
const app = new Koa();
const static = require('./static');

app.use(static(__dirname + '/public'));
app.listen(3000, () => {
    console.log('koa-static 服务开启了');
})