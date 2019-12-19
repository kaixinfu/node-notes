class Router {
	constructor () {
		this.stack = [];
	}
	register(router) {
		this.stack.push(router)
	}
	get(path, action) {
		this.register({method: 'get', path, action})
	}
	post(path, action) {
		this.register({method: 'post', path, action})
	}
	
	/**
	 * 返回值是一个中间件
	 * @returns {Function}
	 */
	routes() {
		const stack = this.stack;
		return async function (ctx, next) {
			const {url, method} = ctx.request;
			const router = stack.find(_stack => _stack.path === url);
			let fn;
			if (router && method && method.toLowerCase() === router.method) {
				fn = router.action;
			}
			if (typeof fn === 'function') {
				fn(ctx, next);
				return
			}
			await next();
		}
	}
}

module.exports = Router
