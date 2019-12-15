# node-notes

### node-1 (node基本api的使用)
<pre>
├── buffer                       // 存放二进制数据的缓冲区
│   ├── index.js                 // 申请内存、创建一个buffer
├── common                       // 公用方法
│   ├── clone.js                 // 下载方法(promise)
│   ├── getPrototype.js          // 遍历原型方法
│   ├── promise.js               // promise实现方法
├── down                         // 下载
│   ├── index.js                 // 测试下载方法
├──fs                            // 读取文件操作
│   ├── sync.js                  // 同步读取
│   ├── async.js                 // 异步读取
│   ├── promisefy.js             // 包装后的异步读取
├── os                           // 操作系统
│   ├── index.js                 // 查看cpu使用率
├──stream                        // 文件流
│   ├── index.js                 // 创建图片流、文件流
├──http                          // 服务
│   ├── index.js                 // 启动server、访问接口
├── package.json                 // 项目配置文件
├──vue-kx-router-cli             // 类似nuxt的cli脚本
│   ├── bin                      
│       ├── kx.js                // 自定义命令init、refresh
│   ├── lib              
│       ├── api.js               // lib需要的方法(complie: 根据模板生产路由文件)
</pre>

