/**
 * 中间件的基本实现方法
 * 组合函数：实现洋葱圈的那种
 */
function add(prv, next) {
    return prv + next
}
function square(prv) {
    return prv * prv
}
console.log('...1', square(add(2, 3)));
function compose1(fn1, fn2) {
    return function (...args) {
        return fn2(fn1(...args))
    }
}
var fn = compose1(add, square);
console.log('....2', fn(2, 3));
/**
 * 先执行第一个function,再将返回值传入下一个function
 * @param {*} fn1 
 * @param  {...any} fns 
 */
function compose2(fn1, ...fns) {
    return function(...args) {
        let res = fn1(...args);
        fns.forEach(fn => {
            res = fn(res)
        })
        return res
    }
}
var fn2 = compose2(add, square, square);
console.log('....3', fn2(2, 3));