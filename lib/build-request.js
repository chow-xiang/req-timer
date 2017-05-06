'use strict';

var http = require('http');
var EventEmiter = require('events');

module.exports = class Req extends EventEmiter{

	constructor(body, method, headers, url, reqTimer){

		super();

		// profil
		method   = method || 'GET';
		var req = this.createReq(method, headers, url);

		// 停止
		this.on('req:bort', () => {
			req.abort();
			reqTimer.emit('req:complete:one', false);
		})

		// 请求
		this.on('req:req', () => {
			if(method.toUpperCase() != 'GET') req.write(body);
			req.end(); // Tell server header and body is sended.
		})

		// 结果
		this.on('req:result', val => {
			reqTimer.emit('req:complete:one', val);
		})
	}


	createReq(method, headers, url){

		if(!url){ return false; }

		// var self   = this;
		var option = {method, headers, url};

		// agent

		var req = http.request(option, resp => {
			resp
			.on('data', chunk => {
				// console.log(1)
				this.emit('req:result', true);
			})
			.on('end', () => {
				// this.emit('req:result', true);
			})
			.on('error', e => {
				this.emit('req:result', false);
				// res(false)
			})
		});

		return req;
	}
}
