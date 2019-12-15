const {clone} = require('../../common/clone');
const fs = require('fs');
const handlebars = require('handlebars')
const program = require('commander')
const symbols = require('log-symbols')
const chalk = require('chalk')

module.exports.init = function(name) {
    console.log('🔥 开始init....', name);
    _templatePath = name; 
    clone('github:su37josephxia/vue-template', name)
}

module.exports.refresh = function() {
    const views = fs.readdirSync('./src/views')
                    .filter(v => v !== 'Home.vue')
                    .map(v => ({
                        name: v.replace('.vue', '').toLowerCase(),
                        file: v
                    }))
    compile({list: views}, './src/App.vue', './template/App.vue.hbs');
    compile({list: views}, './src/router.js', './template/router.js.hbs');
    // console.log('refresh....', _templatePath);
}

function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
        const file = fs.readFileSync(templatePath).toString();
        fs.writeFileSync(filePath, handlebars.compile(file)(meta))
        console.log(symbols.success, chalk.green(`${filePath} 文件创建完成`));
    }
}