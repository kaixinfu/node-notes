/**
 * 问题：/api/data/xxx下的所有数据（参考开发一个基于内存的缓存中间件 解决这个问题）
 * 1.查询接口查询时间较长，影响页面加载速度
 * 2.且数据每日0点会自动刷新，希望开发一个接口缓存功能。
 * 思路：
 * 1.首先肯定是个class，当服务启动时new一个实例，立即将从数据库中查询数据存到实例上
 * 2.计算下时间吧，毕竟一直定时刷新不好，只有当前时间接近0点时，再刷新数据
 * 3.刷新后将数据更新到该实例上
 */
const fnFetchData = require('./delay');
class Cache {
	constructor () {
		this._time = 1000;
		this.cache = {data: {}};
		this.init();
	}
	async init() {
		this.fetchDelay();
	}
	async fetchDelay() {
		let res = await fnFetchData();
		this.cache.data = res;
		clearInterval(this.timer);
		this.loopData()
	}
	loopData() {
		this.timer = setTimeout(() => {
			this.fnTimer();
		}, this._time)
	}
	fnTimer() {
		const date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		console.log(`现在时间:${hours}:${minutes}:${seconds}`, this._time);
		// 22点58之前 定时器时间定为1小时刷一次
		if (hours < 23 && minutes < 59) {
			this._time = 1000 * 60 * 60;
		} else {
			// 23点59分以内 一分钟刷一次
			if (minutes < 59) {
				this._time = 1000 * 60;
			} else {
				// 23点59分钟内 一秒一次
				if (hours !== 22) {
					this._time = 1000;
				}
			}
		}
		if (hours === 23 && minutes === 59 && seconds === 59) {
			this.fetchDelay();
		} else {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.fnTimer()
			}, this._time)
		}
	}
	fetchData() {
		const cache = this.cache;
		return async function(ctx, next) {
			const {url, method} = ctx.request;
			if (url.includes('api/data') > 0 && method === 'GET') {
				ctx.body = cache.data
			}
			await next()
		}
	}
}

module.exports = Cache
