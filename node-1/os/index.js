var os = require('os');
// console.log('os', os);
const mem = os.freemem() / os.totalmem() * 100;
console.log(`内存占⽤用率${mem.toFixed(2)}%`)