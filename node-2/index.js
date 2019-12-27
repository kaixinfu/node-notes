const Index = require('./kx-koa');
const app = new Index();
// app.use((ctx, next) => {
//     ctx.body = '哒哒哒哒....'
// })

app.use(async (ctx, next) => {
    ctx.body = "1";
    await next();
    ctx.body += "5";
});
app.use(async (ctx, next) => {
    ctx.body += "2";
    await delay();
    await next();
    ctx.body += "4" ;
});
app.use(async (ctx, next) => {
    ctx.body += "3";
});
const delay = () => Promise.resolve(resolve => {
    setTimeout(() => {
        resolve()
    }, 2000)
});
const port = 3032;
app.listen(port, () => {
    console.log(`kx-koa ${port} 启动了`)
})
