const Koa = require('./koa');
const app = new Koa();
app.use((ctx, next) => {
    ctx.body = '哒哒哒哒....'
})

const port = 3032;
app.listen(port, () => {
    console.log(`kx-koa ${port} 启动了`)
})