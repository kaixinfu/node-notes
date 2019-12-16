const koa = require('koa');
const app = new koa();
app.use((ctx, next) => {
    ctx.body = {
        name: 'kaixin'
    }
})

const port = 3031;
app.listen(port, () => {
    console.log(`koa ${port} 启动了`)
})