'use strict';

var http = require('http');

module.exports = buildRequest;

/*
* 创造一个request
*/
function buildRequest(body, method, headers, url) {
	return new Promise((res, rej) => {

		var option = {body, method, headers, url};
		var req    = http.request(option, res => {
			res
			.on('end', () => {
				res()
			})
			.on('error', e => {
				rej(e)
			})
		});

		if(method != 'get') req.write(body);
		req.end();
	})
}