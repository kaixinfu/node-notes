const path = require('path');
const fs = require('fs');
/**
 * 静态文件服务koa-static
 * 
 * 配置绝对资源目录地址，默认为static
 * 获取文件或者目录信息
 * 静态文件读取
 * 返回
 * 
 * 根据传入的文件路径，读取文件
 * 是文件夹返回拼接好的字符串，是文件就读取文件内容
 * @param {*} filePath 
 */
function static(filePath = '/public') {
    return async (ctx, next) => {
        if (ctx.url.indexOf('/public') === 0) {
            // console.log("filePath", filePath);
            const url = path.resolve(__dirname, filePath);
            // console.log("url", url);
            console.log("ctx.url", ctx.url);
            const basename = path.basename(url);
            // console.log("basename", basename);
            const filespath = url + ctx.url.replace("/public", "");
            console.log('filespath', filespath);
            try {
                // 判断是否是文件目录
                const _file = fs.statSync(filespath);
                console.log('_file', _file.isDirectory());
                if (_file.isDirectory()) {
                    const files = fs.readdirSync(filespath);
                    console.log('文件夹。。。。', files);
                    let str = `<ul>`
                    files.forEach(file => {
                        // 包含点的是文件，否则是文件夹
                        if (file.indexOf('.') > -1) {
                            str = `${str}<li><a style="color: black" href="${ctx.url}/${file}">${file}</a></li>`
                        } else {
                            str = `${str}<li><a href="${ctx.url}/${file}">${file}</a></li>`
                        }
                    })
                    ctx.body = `${str}</ul>`
                } else {
                    const file = fs.readFileSync(filespath);
                    console.log('文件。。。。', file.toString());
                    ctx.body = file.toString();
                }
            } catch {
                ctx.body = '404 找不到文件'
            }
        }
        await next();
    };
}

module.exports = static