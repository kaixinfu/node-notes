const http = require('http')
const server = http.createServer((request, response) => {
  Math.random() > 0.5 ? aa() : '2'
  response.end('Hello ')
})
if (!module.parent) {
  server.listen(3000)
  console.log('app started at port 3000...')
} else {
  module.exports = server
}

// pm2 monit 可视化用户界面功能
