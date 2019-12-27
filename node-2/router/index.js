const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

// 静态服务地址，指向传入的地址
app.use(require('koa-static')(__dirname + '/'));

router.get('/users', async (ctx, next) => {
    ctx.body = [{ name: 'zhangsan' }, { name: 'lisi' }];
    await next()
})

router.get('/user', async (ctx, next) => {
    ctx.body = { name: 'kaixin' };
    await next()
})

router.post('/login', async (ctx, next) => {
    // 没加bodyPaser中间件，没有值...后期会优化
    console.log('ctx', ctx.request);
    ctx.body = { messsage: '成功了', success: true };
    await next()
})

app.use(router.routes());

const port = 3033;
app.listen(port, () => {
    console.log(`koa-router ${port} 启动了`)
})
