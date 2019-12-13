const fs = require('fs');
const cr = fs.createReadStream('./1.png');
const cw = fs.createWriteStream('./2.png');
const cw3 = fs.createWriteStream('./3.png');
console.log('cr', cr);
cr.pipe(cw);
cr.pipe(cw3);

const cr2 = fs.createReadStream('./1.js');
const cw2 = fs.createWriteStream('./2.js');
console.log('cr2', cr2);
cr2.pipe(cw2);
