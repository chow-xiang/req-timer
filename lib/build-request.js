'use strict';

var http = require('http');

module.exports = buildRequest;

/*
* 创造一个request
*/
function buildRequest(body, method, headers, url, startTime, timeSpace) {

	method = method || 'GET';

	return function reqReq(){
		new Promise((res, rej) => {

			if(process.hrtime(startTime) <= timeSpace){
				return process.nextTick(() => {
					reqReq();
				})
			}

			if(!url){ res(false); }

			var option = {body, method, headers, url};
			var req    = http.request(option, res => {
				res
				.on('end', () => {
					res(true)
				})
				.on('error', e => {
					res(false)
				})
			});

			if(method.toUpperCase() != 'GET') req.write(body);
			req.end();
		})
	}
	
}