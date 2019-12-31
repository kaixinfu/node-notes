/**
 * 实现一个文件系统读写数据库
 */
const fs = require('fs');
const filePath = './db.json';
function get(key) {
    fs.readFile(filePath, (err, data) => {
        if (!err) {
            console.log('data', data);
            console.log(`${key} = ${JSON.parse(data)[key]}`)
        }
    })
}
function set(key, value) {
    fs.readFile("./db.json", (err, data) => {
        console.log('data....', data);
        console.log('err......', err);
        const json = data ? JSON.parse(data) : {};
        json[key] = value;
        fs.writeFile(filePath, JSON.stringify(json), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("写入成功!");
            }
        });
    })
}

const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', (input) => {
    console.log('input', input);
    const [op, key, value] = input.split(" ");
    if (op === 'get') {
        get(key)
    } else if (op === 'set') {
        set(key, value)
    } else if (op === 'quit') {
        rl.close();
    } else {
        console.log('........');
    }
})
rl.on('close', () => {
    console.log('退出程序');
    process.exit(0)
})