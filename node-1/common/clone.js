const {promisify} = require('util');
const ora = require('ora');
const process = ora('🔥开始下载...');
const download = require('download-git-repo');
async function clone(url, path, success, fall) {
    let _download = promisify(download);
    try {
        process.start();
        let res = await _download(url, path);
        process.succeed('🔥下载成功...');
        console.log('.....succ', res)
    } catch(err) {
        process.fail('🔥下载失败...');
        fall && fall();
    }
    console.log('.....gg')
}

module.exports = {clone}