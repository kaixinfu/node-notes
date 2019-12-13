const path = require('path');
// console.log('path', path);
// console.log('__dirname', __dirname);
const fs = require('fs');
const path1 = path.resolve(__dirname, 'a.js');
const path2 = path.resolve(path.resolve(__dirname, 'a.js'));
// fs.readFile(path1, (err, data) => {
//     console.log('err', err);
//     console.log('data', data);
// })

const {promisify} = require('util');
const _readFile = promisify(fs.readFile);
async function readFile(callback) {
    try {
        let res = await _readFile(path1);
        const res2 = Buffer.from(res).toString('utf-8')
        console.log('....res', res);
        console.log('....res2', res2);
    } catch(err) {
        console.log('err', err)
    }
    console.log('.....gg')
}
readFile(path1)