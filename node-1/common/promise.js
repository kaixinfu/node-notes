const PENDING = Symbol('PENDING');
const RESOLVED = Symbol('RESOLVED');
const REJECTED = Symbol('REJECTED');

const resolvePromise = (promise2, x, resolve, reject) => {
	if (promise2 === x) {
		return reject(
			new TypeError('Chaining cycle detected for promise #<promise>'))
	}
	if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
		//防止多次调用成功或者失败
		let called; // 内部测试的时候,会成功和失败都调用
		try { //预防取.then的时候错误
			let then = x.then; //Object.definePropertype
			if (typeof then === 'function') {
				//没有  x.then,因为怕再次取.then的时候出错
				then.call(x, y => { //y的结果可能还是一个promise,递归调用,直到结果是一个普通值
					//resolve(y);//采用promise的成功结果向下传递
					if (called) {
						return
					}
					called = true
					resolvePromise(promise2, y, resolve, reject)
				}, r => {
					//r不再判断是否是promise,因为报错,直接传递
					if (called) {
						return
					}
					called = true
					reject(r); //失败结果向下传递
				});
			} else {
				//代表向下传递的返回值是一个普通对象
				resolve(x)
			}
		} catch (e) {
			if (called) {
				return
			}
			called = true
			reject(e)
		}

	} else {
		resolve(x)
	}
}
class Promise {
	constructor(executor) {
		this.status = PENDING;
		this.onResolvedCallbacks = [];
		this.onRejectedCallbacks = [];
		this.value = undefined;
		this.reason = undefined;
		let resolve = (value) => {
			if (this.status === PENDING) {
				this.value = value
				this.status = RESOLVED
				this.onResolvedCallbacks.forEach(fn => fn())
			}
		}
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason
				this.status = REJECTED
				this.onRejectedCallbacks.forEach(fn => fn())
			}
		}
		try {
			executor(resolve, reject)
		} catch (e) {
			reject(e)
		}
	}
	then(onfulfilled, onrejected) {
		//onfulfilled, onrejected 都是可选参数
		onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data;

		onrejected = typeof onrejected === 'function' ? onrejected : err => {
			throw err;
		}
		let promise2 = new Promise((resolve, reject) => {
			if (this.status === RESOLVED) {
				setTimeout(() => {
					try {
						const x = onfulfilled(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				}, 0)

				return
			}
			if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						const x = onrejected(this.reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				}, 0)
			}
			if (this.status === PENDING) {
				this.onResolvedCallbacks.push(() => {
					setTimeout(() => {
						try {
							const x = onfulfilled(this.value)
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}

					}, 0)
				})
				this.onRejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							const x = onrejected(this.reason)
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
			}
		})
		return promise2
	}
}
Promise.defer = Promise.deferred = function() {
	let dfd = {};
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}


module.exports = Promise
