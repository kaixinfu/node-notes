const cluster = require('cluster')
const os = require('os')
const numCpus = os.cpus().length
console.log('numCpus', numCpus)
const process = require('process')

const workers = {}

if (cluster.isMaster) {
  console.log('主进程...')
  // 退出，不能工作了。报错会走到这里
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid}出错了`)
    delete workers[worker.process.pid]
    worker = cluster.fork()
    workers[worker.process.pid] = worker
  })
  // 代表主进程，负责管理
  for (let i = 0; i < numCpus; i++) {
    const worker = cluster.fork()
    workers[worker.process.pid] = worker
  }
} else {
  console.log('附属进程...')
  // 附属进程，也叫做工作进程
  const app = require('./app')
  app.listen(3000)
}
// 按了commond + C，会触发此回调
process.on('SIGTERM', () => {
  console.log('SIGTERM...')
  for (let pid in workers) {
    process.kill(pid)
  }
  console.log('exit....')
  // 退出进程
  process.exit(0)
})

require('./test')
