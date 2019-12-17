// 观察HTTP协议
// curl -v http://www.baidu.com

// /http/api.js
const http = require("http");
const fs = require("fs");
http.createServer((req, res) => {
    const { method, url } = req;
    console.log('...', url);
    if (method == "GET" && url == "/") {
      fs.readFile("./index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    } else if (method == "GET" && url == "/api/user") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ name: "kaixin", age: 20 }));
    }
  }).listen(3000, () => {
      console.log('启动了')
  });