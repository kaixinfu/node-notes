const Index = require('../kx-koa');
const app = new Index();
const port = 3000;
app.listen(port, () => {
    console.log(`${port}端口启动了`)
});
