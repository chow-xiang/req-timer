'use strict';

var Req         = require('./build-request.js');
var EventEmiter = require('events');

module.exports = class ReqTimer extends EventEmiter{

	constructor(n, t, b, m, h, url) {

		super();

		var result = {
			error: 0,
			success: 0
		}
		this.on('req:complete:one', ret => {
			if(ret) result.success++;
			else result.error++;
			
			if(result.success + result.error == n){ // if complete all
				this.emit('req:complete:all', result) 
			}
		})

		Promise.all([this.reqTime(n, t, b, m, h, url)])

		return new Promise((res, rej) => {
			this.on('req:complete:all', ret => {
				res(ret);
			})
		})
	}

	async reqTime(n, t, b, m, h, url) {

		var timeSpace = ~~(t * 1000000 / n);
		var startTime = process.hrtime();
		var tem = process.hrtime();

		// 跑满设定的次数
		for(let i=0;i < n;i++){
			startTime = await awaiter(startTime, timeSpace);
			process.nextTick(() => {
				var req = new Req(b, m, h, url, this);
				req.emit('req:req');
			})
		}

		var diff = process.hrtime(tem);
		console.log((diff[0] * 1e9 + diff[1]) / 1e6)
	}
}

// simple awaiter
async function  awaiter (startTime = process.hrtime(), timeSpace = 1) {

	return new Promise((res, rej) => {
		var diff = process.hrtime(startTime);
		while((diff[0] * 1e9 + diff[1]) < timeSpace){
			var a = 3000 * 3000 + '';
			diff = process.hrtime(startTime);
			continue;
		}
		res(process.hrtime());
	})
}

process.on('unhandledRejection', error => {
	// Will print "unhandledRejection err is not defined"
	console.log('unhandledRejection', error.message);
});
