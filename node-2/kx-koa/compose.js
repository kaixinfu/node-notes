/**
 * 异步中间件的基本实现方法
 */
function compose(middlewares) {
    return function (ctx) {
        /**
         * next指向的是下一个function，必须是一个
         * @param {*} i 
         */
        console.log('middlewares', middlewares);
        function dispath(i) {
            let fn = middlewares[i];
            if (!fn) {
                return Promise.resolve('....没了')
            }
            if (fn) {
                return Promise.resolve(fn(ctx, function next() {
                    return dispath(i + 1);
                }))
            }
        }
        return dispath(0);
    }
}

module.exports = { compose }