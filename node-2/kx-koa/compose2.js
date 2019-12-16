/**
 * 异步中间件的基本实现方法
 */
async function fn1(next) {
    console.log('fn1...start');
    await next();
    console.log('fn1...end');
}
async function fn2(next) {
    console.log('fn2...start');
    await delay();
    await next();
    console.log('fn2...end');
}
function fn3() {
    console.log('fn3......');
}
/**
 * 等待这个Promise对象执行
 */
function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('...delay')
        }, 2000)
    })
}
function compose(middlewares) {
    return function (...args) {
        /**
         * next指向的是下一个function，必须是一个
         * @param {*} i 
         */
        function dispath(i) {
            let fn = middlewares[i];
            if (!fn) {
                return Promise.resolve('....没了')
            }
            if (fn) {
                return Promise.resolve(fn(function next () {
                    return dispath(i + 1);
                }))
            }
        }
        return dispath(0);
  }
}
var fns = compose([fn1, fn2, fn3]);
fns();