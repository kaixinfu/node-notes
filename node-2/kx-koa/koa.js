/**
 * koa相对与原始的http写法，好处有两点
 * 1.写法优雅了一些，比如createContext中的用法
 * 2.更多的使用了中间件
 */
const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Koa {
    /**
     * 创建一个http服务，启动
     * @param  {...any} args 
     */
    listen(...args) {
        const server = http.createServer((req, res) => {
            let ctx = this.createContext(req, res);
            this.callback(ctx);
            res.end(ctx.body)
        });
        server.listen(...args)
    }
    use(callback) {
        this.callback = callback
    }
    /**
     * 此时的Object.create方法只是让左边变量上具有那些存取器的方法
     * 例如在listen中访问ctx.body:
     * 实际上是调用自身原型上的方法，即context的get方法，访问this(当前实例对象：new Koa() 对象实例)上的body;
     * 搞了半天，其实就是封装了一下存取方法，增加了可读性而已
     * @param {*} req 
     * @param {*} res 
     */
    createContext(req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx
    }
}

module.exports = Koa