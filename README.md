# node-notes

### node-1 (node 基本 api 的使用)

<pre>
├── buffer                       // 存放二进制数据的缓冲区
│   ├── index.js                 // 申请内存、创建一个buffer
├── common                       // 公用方法
│   ├── clone.js                 // 下载方法(promise)
│   ├── getPrototype.js          // 遍历原型方法
│   ├── promise.js               // promise实现方法
├── down                         // 下载
│   ├── index.js                 // 测试下载方法
├── fs                           // 读取文件操作
│   ├── sync.js                  // 同步读取
│   ├── async.js                 // 异步读取
│   ├── promisefy.js             // 包装后的异步读取
├── os                           // 操作系统
│   ├── index.js                 // 查看cpu使用率
├── stream                       // 文件流
│   ├── index.js                 // 创建图片流、文件流
├── http                         // 服务
│   ├── index.js                 // 启动server、访问接口
├── package.json                 // 项目配置文件
├── vue-kx-router-cli            // 类似nuxt的cli脚本
│   ├── bin                      
│       ├── kx.js                // 自定义命令init、refresh
│   ├── lib              
│       ├── api.js               // lib需要的方法(complie: 根据模板生产路由文件)
</pre>

### node-2 (koa 的实现)

<pre>
├── cache                      
│   ├── Cache.js                 // 缓存中间件
├── koa                      
│   ├── index.js                 // 使用koa创建服务
├── kx-koa                       
│   ├── compose.js               // 异步中间件的实现方法（结合ctx）
│   ├── compose1.js              // 中间件的基本实现（同步）
│   ├── compose2.js              // 中间件的基本实现（异步）
│   ├── index.js                 // 使用封装的koa启动服务
│   ├── index.js                 // 封装koa基本实现方法（createServer，中间件）
│   ├── context.js               // ctx对象的存取方法
│   ├── request.js               // 请求对象的存取方法
│   ├── response.js              // 返回对象的存取方法
├── router                       
│   ├── index.html               // 测试的静态文件
│   ├── index.js                 // 使用koa-router配置路由
├── kx-router                       
│   ├── Router.js                // koa-router的源码分析
├── kx-static
│   ├── static.js                // 静态文件服务
├── iptable                       
│   ├── Iptable.js               // 拦截黑名单的中间件
</pre>

### node-3 (网络编程)

<pre>
├── im                      
│   ├── index.js                 // 使用net创建连接服务，实现通讯
├── http                     
│   ├── index.js                 // 服务、接口
│   ├── index.html               // 用来观察请求、响应对象
</pre>
