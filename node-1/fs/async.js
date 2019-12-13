const fs = require('fs');
fs.readFile('./a.js', (err, data) => {
    console.log('err', err);
    console.log('data', data.toLocaleString());
})
console.log('...gg');